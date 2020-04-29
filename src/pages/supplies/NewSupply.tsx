/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setProductCode } from '../../redux/products/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductCodes from '../../reusables/partials/ProductCodes';
import { AppState } from '../../redux';
import { ProductsState, ProductCode } from '../../redux/products/types';
import supply from '../../api/supply';
import SuppliesFormPage from '../../components/supplies/SuppliesFormPage';
import { fetchDaySupplies } from '../../redux/supplies/actions';
import DaySupplies from '../../components/supplies/DaySupplies';

interface NewSupplyProps {
    setProductCode: typeof setProductCode;
    fetchDaySupplies: typeof fetchDaySupplies;
    history: any;
    productCode?: ProductCode;
}
const NewSupply: React.FC<NewSupplyProps> = (props): JSX.Element => {
    const { setProductCode, history, productCode, fetchDaySupplies } = props;

    const [isLoading, setIsLoading] = useState(true);
    const { companyID, company, stationID, station, codeID, codeName } = useParams();

    useEffect(() => {
        if (codeID === null) {
            setProductCode({
                id: Number(),
                code: '',
            });
            return;
        }

        setProductCode({
            id: Number(codeID),
            code: codeName,
        });

        setIsLoading(false);
    }, [codeID, setProductCode, codeName]);

    function getDayWetSupplies(stationID?: string, productID?: number, dateOfSupply?: string): any {
        supply.getDaySuppliesByProductID(stationID, productID, dateOfSupply).then((res) => {
            fetchDaySupplies({
                daySupplies: res.data,
            });
        });
    }

    function getDayDrySupplies(stationID?: string, productCodeID?: string, dateOfSupply?: string): any {
        supply.getDaySuppliesByProductCodeID(stationID, productCodeID, dateOfSupply).then((res) => {
            fetchDaySupplies({
                daySupplies: res.data,
            });
        });
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        e.preventDefault();

        const index = e.target.selectedIndex;
        const productCode = e.target[index].getAttribute('data-name') || undefined;
        const value = parseInt(e.target.value);

        setProductCode({
            id: value,
            code: productCode,
        });
        fetchDaySupplies({
            daySupplies: {},
        });

        setIsLoading(false);

        history.push(
            '/' +
                companyID +
                '/' +
                company +
                '/' +
                stationID +
                '/' +
                station +
                '/newsupply/' +
                value +
                '/' +
                productCode,
        );
    };

    return (
        <>
            <div className="sales-header">
                <h3 className="signage">New {codeName} Supply</h3>
                <ProductCodes handleSelect={handleSelect} selectedCode={productCode} />
                <div className="card card-wrapper" style={{ marginTop: '20px' }}>
                    {!isLoading && (
                        <SuppliesFormPage getDayWetSupplies={getDayWetSupplies} getDayDrySupplies={getDayDrySupplies} />
                    )}
                    <DaySupplies />
                </div>
            </div>
        </>
    );
};

NewSupply.propTypes = {
    setProductCode: PropTypes.any,
    history: PropTypes.any,
    productCode: PropTypes.any,
    fetchDaySupplies: PropTypes.any,
};

const mapStateToProps = (state: AppState): ProductsState => ({
    productCode: state.productsRoot.productCode,
});

export default connect(mapStateToProps, { setProductCode, fetchDaySupplies })(NewSupply);
