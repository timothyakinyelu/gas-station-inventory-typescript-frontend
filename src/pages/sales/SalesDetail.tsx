/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { fetchSalesDetails } from '../../redux/sales/actions';
import { useParams } from 'react-router-dom';
import sale from '../../api/sale';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { Sales, SalesState } from '../../redux/sales/types';
import DataTable from '../../reusables/partials/DataTable';
import Loader from '../../reusables/Loader';
import { addToast } from '../../redux/toast/actions';

interface SalesDetailProps {
    fetchSalesDetails: typeof fetchSalesDetails;
    addToast: typeof addToast;
    salesDetail?: Sales;
}

const SalesDetail: React.FC<SalesDetailProps> = (props): JSX.Element => {
    const { fetchSalesDetails, salesDetail } = props;
    const { stationID, codeID, code, date } = useParams();
    const [isFetched, setIsFetched] = useState(false);
    const count = Math.floor(Math.random() * 100 + 1);

    const items = salesDetail;

    const getSalesDetail = useCallback((): any => {
        sale.getSalesByDate(Number(stationID), Number(codeID), date)
            .then((res) => {
                fetchSalesDetails({
                    salesDetail: res.data,
                });
                setIsFetched(true);
            })
            .catch((err) => {
                console.log(err.response.data);
                setIsFetched(false);
            });
    }, [fetchSalesDetails, stationID, codeID, date]);

    useEffect(() => {
        const ac = new AbortController();

        if (codeID === undefined) {
            return;
        }

        getSalesDetail();

        return function cleanup(): void {
            setIsFetched(false);
            ac.abort();
        };
    }, [codeID, getSalesDetail]);

    const deleteSelected = (data?: any[]): void => {
        sale.deleteSale(data).then((res) => {
            props.addToast({
                id: count,
                message: res.data.status,
            });
            getSalesDetail();
        });
    };

    return (
        <>
            {!isFetched ? (
                <Loader />
            ) : (
                <>
                    <div className="list-table">
                        <h5 title="sales-detail" className="sales-table-header">
                            {code} Sales Detail for {date}
                        </h5>
                        <div className="list-table-inner">
                            {items?.data !== undefined ? (
                                <DataTable items={items} deleteSelected={deleteSelected} />
                            ) : (
                                <h4>{items?.message}</h4>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

SalesDetail.propTypes = {
    fetchSalesDetails: PropTypes.any,
    salesDetail: PropTypes.any,
    addToast: PropTypes.any,
};

const mapStateToProps = (state: AppState): SalesState => ({
    salesDetail: state.salesRoot.salesDetail,
});

export default connect(mapStateToProps, { fetchSalesDetails, addToast })(SalesDetail);
