/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback } from 'react';
import { Station } from '../../redux/central/types';
import PropTypes from 'prop-types';
import { AppState } from '../../redux';
import { SuppliesState, Supplies, FETCH_STATION_SUPPLIES } from '../../redux/supplies/types';
import { connect, useDispatch } from 'react-redux';
import DataTable from '../../reusables/partials/DataTable';
import supply from '../../api/supply';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { addToast } from '../../redux/toast/actions';

interface SuppliesListProps {
    station?: Station;
    supplies?: Supplies;
    getSupplies: (value?: number) => void;
    handleEdit: (value?: number) => void;
    addToast: typeof addToast;
}
const SuppliesList: React.FC<SuppliesListProps> = (props): JSX.Element => {
    const { supplies, station } = props;
    const str = station?.slug;

    const name = str?.replace(/-/, ' ').toLocaleUpperCase();
    const items = supplies;
    const count = Math.random() * 100 + 1;

    const history = useHistory();
    const dispatch = useDispatch();
    const { companyID, company, stationID, stationName } = useParams();

    function useQuery(): any {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const page = query.get('page');

    const fetchData = useCallback(
        (pageNumber: number): any => {
            supply.getSuppliesByStation(Number(stationID), pageNumber).then((res) => {
                dispatch({
                    type: FETCH_STATION_SUPPLIES,
                    payload: {
                        supplies: res.data,
                    },
                });
            });

            history.push(
                '/' + companyID + '/' + company + '/stocks/' + stationID + '/' + stationName + '?page=' + pageNumber,
            );
        },
        [dispatch, history, companyID, company, stationID, stationName],
    );

    const changePage = useCallback(
        (pageNumber: number): void => {
            if (pageNumber) {
                fetchData(pageNumber);
            }
        },
        [fetchData],
    );

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
    station: PropTypes.any,
    supplies: PropTypes.any,
    addToast: PropTypes.any,
    getSupplies: PropTypes.any,
    handleEdit: PropTypes.any,
};

const mapStateToProps = (state: AppState): SuppliesState => ({
    supplies: state.suppliesRoot.supplies,
});

export default connect(mapStateToProps, { addToast })(SuppliesList);
