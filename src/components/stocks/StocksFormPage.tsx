/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import WetStocksForm from './WetStocksForm';
import DryStocksForm from './DryStocksForm';
import { useParams } from 'react-router-dom';
import { codes } from '../../constants';
import { addToast } from '../../redux/toast/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import product from '../../api/product';
import stock from '../../api/stock';

interface StocksFormProps {
    addToast: typeof addToast;
    getDayWetStocks: (stationID?: string, productID?: number, dateOfInventory?: string) => any;
    getDayDryStocks: (stationID?: string, codeID?: string, dateOfInventory?: string) => any;
}

const StocksFormPage: React.FC<StocksFormProps> = (props): JSX.Element => {
    const { addToast } = props;

    const { companyID, codeID } = useParams();
    const [products, setProducts] = useState([]);
    const count = Math.random() * 100 + 1;

    const getProductsByCodeId = useCallback((id) => {
        // try {
        product
            .getProductByCodeId(id, companyID)
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
        // } catch (e) {
        //     // console.log(e);
        // }
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
        dateOfInventory?: string,
        items?: any[],
    ): void => {
        stock
            .storeNewWetStock(stationID, codeID, productID, dateOfInventory, items)
            .then((res) => {
                addToast({
                    id: count,
                    message: res.data.success,
                });
                props.getDayWetStocks(stationID, productID, dateOfInventory);
            })
            .catch((err) => {
                addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
    };

    const handleDrySubmit = (stationID?: string, codeID?: string, dateOfInventory?: string, items?: any[]): void => {
        stock
            .storeNewDryStock(stationID, codeID, dateOfInventory, items)
            .then((res) => {
                addToast({
                    id: count,
                    message: res.data.success,
                });
                props.getDayDryStocks(stationID, codeID, dateOfInventory);
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
                        <WetStocksForm products={products} handleSubmit={handleWetSubmit} />
                    ) : Number(codeID) === codes.LPG || Number(codeID) === codes.LUBE ? (
                        <DryStocksForm products={products} handleSubmit={handleDrySubmit} />
                    ) : (
                        <h5>Please select a product code!</h5>
                    )}
                </div>
            </div>
        </>
    );
};

StocksFormPage.propTypes = {
    addToast: PropTypes.any,
    getDayWetStocks: PropTypes.any,
    getDayDryStocks: PropTypes.any,
};

export default connect(null, { addToast })(StocksFormPage);
