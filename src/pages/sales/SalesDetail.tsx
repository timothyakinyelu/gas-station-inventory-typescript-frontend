/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { fetchSalesDetails, fetchSaleToEdit } from '../../redux/sales/actions';
import { useParams } from 'react-router-dom';
import sale from '../../api/sale';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { Sales, SalesState, Sale } from '../../redux/sales/types';
import DataTable from '../../reusables/partials/DataTable';
import Loader from '../../reusables/Loader';
import { addToast } from '../../redux/toast/actions';
import EditSaleModal from '../../components/sales/EditSaleModal';
import product from '../../api/product';

interface SalesDetailProps {
    fetchSalesDetails: typeof fetchSalesDetails;
    addToast: typeof addToast;
    fetchSaleToEdit: typeof fetchSaleToEdit;
    salesDetail?: Sales;
    editSale?: Sale;
}

const SalesDetail: React.FC<SalesDetailProps> = (props): JSX.Element => {
    const { fetchSalesDetails, salesDetail, fetchSaleToEdit, editSale } = props;

    const { companyID, stationID, codeID, code, date } = useParams();

    const [isFetched, setIsFetched] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const count = Math.random() * 100 + 1;

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

    const getProducts = useCallback(() => {
        product.getProducts(companyID).then((res) => {
            setProducts(res.data.data);
        });
    }, []);

    useEffect(() => {
        const ac = new AbortController();

        if (codeID === undefined) {
            return;
        }

        getSalesDetail();
        getProducts();

        return function cleanup(): void {
            setIsFetched(false);
            ac.abort();
        };
    }, [codeID, getSalesDetail, getProducts]);

    const handleEdit = (id?: number): void => {
        setEditModalShow(true);
        setLoading(true);
        // try {
        sale.editDaySale(id)
            .then((res) => {
                // console.log(res.data.user)
                fetchSaleToEdit({
                    editSale: res.data.sale,
                });
                setLoading(false);
            })
            .catch((err) => {
                props.addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
        // } catch (e) {
        //     console.log(e.response);
        // }
    };

    const handleHide = (): void => {
        setEditModalShow(false);
        setLoading(true);
    };

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
                            {items?.data === undefined || items?.data.length < 0 ? (
                                <h5>No Records Available!</h5>
                            ) : (
                                <DataTable items={items} deleteSelected={deleteSelected} handleEdit={handleEdit} />
                            )}
                        </div>
                        {!loading && (
                            <EditSaleModal
                                show={editModalShow}
                                onHide={handleHide}
                                showEdit={editSale}
                                handleLoad={getSalesDetail}
                                products={products}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

SalesDetail.propTypes = {
    fetchSalesDetails: PropTypes.any,
    salesDetail: PropTypes.any,
    fetchSaleToEdit: PropTypes.any,
    addToast: PropTypes.any,
    editSale: PropTypes.any,
};

const mapStateToProps = (state: AppState): SalesState => ({
    salesDetail: state.salesRoot.salesDetail,
    editSale: state.salesRoot.editSale,
});

export default connect(mapStateToProps, { fetchSalesDetails, fetchSaleToEdit, addToast })(SalesDetail);
