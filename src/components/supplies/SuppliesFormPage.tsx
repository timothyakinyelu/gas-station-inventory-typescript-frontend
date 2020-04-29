/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import WetSuppliesForm from './WetSuppliesForm';
import DrySuppliesForm from './DrySuppliesForm';
import { useParams } from 'react-router-dom';
import { codes } from '../../constants';
import { addToast } from '../../redux/toast/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import product from '../../api/product';
import supply from '../../api/supply';

interface SuppliesFormProps {
    addToast: typeof addToast;
    getDayWetSupplies: (stationID?: string, productID?: number, dateOfSupply?: string) => any;
    getDayDrySupplies: (stationID?: string, codeID?: string, dateOfSupply?: string) => any;
}

const SuppliesFormPage: React.FC<SuppliesFormProps> = (props): JSX.Element => {
    const { addToast } = props;

    const { companyID, codeID } = useParams();
    const [products, setProducts] = useState([]);
    const count = Math.random() * 100 + 1;

    const getProductsByCodeId = useCallback((id) => {
        try {
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
        dateOfSupply?: string,
        supplyPrice?: number,
        items?: any[],
    ): void => {
        supply
            .storeNewWetSupply(stationID, codeID, productID, dateOfSupply, supplyPrice, items)
            .then((res) => {
                addToast({
                    id: count,
                    message: res.data.success,
                });
                props.getDayWetSupplies(stationID, productID, dateOfSupply);
            })
            .catch((err) => {
                addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
    };

    const handleDrySubmit = (stationID?: string, codeID?: string, dateOfSupply?: string, items?: any[]): void => {
        supply
            .storeNewDrySupply(stationID, codeID, dateOfSupply, items)
            .then((res) => {
                addToast({
                    id: count,
                    message: res.data.success,
                });
                props.getDayDrySupplies(stationID, codeID, dateOfSupply);
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
                        <WetSuppliesForm products={products} handleSubmit={handleWetSubmit} />
                    ) : Number(codeID) === codes.LPG || Number(codeID) === codes.LUBE ? (
                        <DrySuppliesForm products={products} handleSubmit={handleDrySubmit} />
                    ) : (
                        <h5>Please select a product code!</h5>
                    )}
                </div>
            </div>
        </>
    );
};

SuppliesFormPage.propTypes = {
    addToast: PropTypes.any,
    getDayWetSupplies: PropTypes.any,
    getDayDrySupplies: PropTypes.any,
};

export default connect(null, { addToast })(SuppliesFormPage);
