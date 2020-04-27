/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback, useState } from 'react';
import { Station } from '../../redux/central/types';
import PropTypes from 'prop-types';
import { AppState } from '../../redux';
import { SuppliesState, Supplies } from '../../redux/supplies/types';
import { connect } from 'react-redux';
import DataTable from '../../reusables/partials/DataTable';
import supply from '../../api/supply';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { addToast } from '../../redux/toast/actions';
import Search from '../../reusables/partials/Search';
import { inTreeApi } from '../../config';
import { debounce } from 'lodash';
import { fetchStationSupplies } from '../../redux/supplies/actions';

interface SuppliesListProps {
    fetchStationSupplies: typeof fetchStationSupplies;
    station?: Station;
    supplies?: Supplies;
    getSupplies: (value?: number) => void;
    handleEdit: (value?: number) => void;
    addToast: typeof addToast;
}
const SuppliesList: React.FC<SuppliesListProps> = (props): JSX.Element => {
    const { supplies, station, fetchStationSupplies } = props;
    const str = station?.slug;

    const name = str?.replace(/-/, ' ').toLocaleUpperCase();
    const items = supplies;
    const count = Math.random() * 100 + 1;

    const history = useHistory();

    const { companyID, company, stationID, stationName } = useParams();
    const [term, setTerm] = useState<string | undefined>('');

    function useQuery(): any {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const page = query.get('page');

    const fetchData = useCallback(
        (pageNumber: number): any => {
            supply.getSuppliesByStation(Number(stationID), pageNumber).then((res) => {
                fetchStationSupplies({
                    supplies: res.data,
                });
            });

            history.push(
                '/' + companyID + '/' + company + '/supplies/' + stationID + '/' + stationName + '?page=' + pageNumber,
            );
        },
        [history, companyID, company, stationID, stationName, fetchStationSupplies],
    );

    const changePage = useCallback(
        (pageNumber: number): void => {
            if (pageNumber) {
                fetchData(pageNumber);
            }
        },
        [fetchData],
    );

    const sendQuery = (query: string): void => {
        if (term === undefined) return;
        if (term?.length > -1) {
            const requestOptions = {
                params: {
                    search: query,
                },
            };
            inTreeApi.get('/suppliesbystation/' + stationID, requestOptions).then(function (response) {
                fetchStationSupplies({
                    supplies: response.data,
                });
            });
        }
    };

    const delayedQuery = useCallback(
        debounce((q: string) => sendQuery(q), 500),
        [],
    );

    const searchSupplies = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTerm(e.target.value);
        delayedQuery(e.target.value);
    };

    useEffect(() => {
        const ac = new AbortController();
        if (!page) {
            return;
        }

        fetchData(page);
        changePage(page);
        return function cleanup(): void {
            ac.abort();
        };
    }, [page, changePage, fetchData]);

    const deleteSelected = (data?: any[]): void => {
        supply.deleteSupply(data).then((res) => {
            addToast({
                id: count,
                message: res.data.status,
            });
            props.getSupplies();
        });
    };

    return (
        <div className="list-table">
            {name && (
                <>
                    <h5 title={name} className="sales-table-header">
                        {name} Supplies Table
                    </h5>
                    <div className="list-table-inner">
                        <Search handleSearch={searchSupplies} />
                        {items?.data === undefined || items?.data.length < 0 ? (
                            <h5>No Records Available!</h5>
                        ) : (
                            <DataTable
                                items={items}
                                name={name}
                                changePage={changePage}
                                deleteSelected={deleteSelected}
                                handleEdit={props.handleEdit}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

SuppliesList.propTypes = {
    fetchStationSupplies: PropTypes.any,
    station: PropTypes.any,
    supplies: PropTypes.any,
    addToast: PropTypes.any,
    getSupplies: PropTypes.any,
    handleEdit: PropTypes.any,
};

const mapStateToProps = (state: AppState): SuppliesState => ({
    supplies: state.suppliesRoot.supplies,
});

export default connect(mapStateToProps, { addToast, fetchStationSupplies })(SuppliesList);
