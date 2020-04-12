/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import WetSalesForm from './WetSalesForm';
import DrySalesForm from './DrySalesForm';
import { useParams } from 'react-router-dom';
import { codes } from '../../constants';
import { addToast } from '../../redux/toast/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import product from '../../api/product';
import sale from '../../api/sale';

interface SalesFormProps {
    addToast: typeof addToast;
    getDayWetSales: (stationID?: string, productID?: number, dateOfSale?: string) => any;
    getDayDrySales: (stationID?: string, codeID?: string, dateOfSale?: string) => any;
}

const SalesFormPage: React.FC<SalesFormProps> = (props): JSX.Element => {
    const { addToast } = props;

    const { codeID } = useParams();
    const [products, setProducts] = useState([]);
    const count = Math.random() * 100 + 1;

    const getProductsByCodeId = useCallback((id) => {
        try {
            product
                .getProductByCodeId(id)
                .then((res) => {
                    setProducts(res.data.products);
                })
                .catch((err) => {
                    addToast({
                        id: count,
                        message: err.response.data.error,
                    });
                });
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        if (!codeID) {
            return;
        }

        getProductsByCodeId(codeID);
    }, [codeID, getProductsByCodeId]);

    const handleWetSubmit = (
        stationID?: string,
        codeID?: string,
        productID?: number,
        unitPrice?: number,
        dateOfSale?: string,
        foreCourts?: any[],
    ): void => {
        sale.storeNewWetSale(stationID, codeID, productID, unitPrice, dateOfSale, foreCourts)
            .then((res) => {
                addToast({
                    id: count,
                    message: res.data.success,
                });
                props.getDayWetSales(stationID, productID, dateOfSale);
            })
            .catch((err) => {
                addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
    };

    const handleDrySubmit = (stationID?: string, codeID?: string, dateOfSale?: string, foreCourts?: any[]): void => {
        sale.storeNewDrySale(stationID, codeID, dateOfSale, foreCourts)
            .then((res) => {
                addToast({
                    id: count,
                    message: res.data.success,
                });
                props.getDayDrySales(stationID, codeID, dateOfSale);
            })
            .catch((err) => {
                addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
    };

    return (
        <>
            <div className="list-table">
                <div className="form-container">
                    {Number(codeID) === codes.PMS || Number(codeID) === codes.AGO ? (
                        <WetSalesForm products={products} handleSubmit={handleWetSubmit} />
                    ) : Number(codeID) === codes.LPG || Number(codeID) === codes.LUBE ? (
                        <DrySalesForm products={products} handleSubmit={handleDrySubmit} />
                    ) : (
                        <h5>Please select a product code!</h5>
                    )}
                </div>
            </div>
        </>
    );
};

SalesFormPage.propTypes = {
    addToast: PropTypes.any,
    getDayWetSales: PropTypes.any,
    getDayDrySales: PropTypes.any,
};

export default connect(null, { addToast })(SalesFormPage);
