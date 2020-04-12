/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setProductCode } from '../../redux/products/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductCodes from '../../reusables/partials/ProductCodes';
import { AppState } from '../../redux';
import { ProductsState, ProductCode } from '../../redux/products/types';
import stock from '../../api/stock';
import StocksFormPage from '../../components/stocks/StocksFormPage';
import { fetchDayStocks } from '../../redux/stocks/actions';
import DayStocks from '../../components/stocks/DayStocks';

interface NewStockProps {
    setProductCode: typeof setProductCode;
    fetchDayStocks: typeof fetchDayStocks;
    history: any;
    productCode?: ProductCode;
}
const NewStock: React.FC<NewStockProps> = (props): JSX.Element => {
    const { setProductCode, history, productCode, fetchDayStocks } = props;

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

    function getDayWetStocks(stationID?: string, productID?: number, dateOfInventory?: string): any {
        stock.getDayStocksByProductID(stationID, productID, dateOfInventory).then((res) => {
            fetchDayStocks({
                dayStocks: res.data,
            });
        });
    }

    function getDayDryStocks(stationID?: string, productCodeID?: string, dateOfInventory?: string): any {
        stock.getDayStocksByProductCodeID(stationID, productCodeID, dateOfInventory).then((res) => {
            fetchDayStocks({
                dayStocks: res.data,
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
        fetchDayStocks({
            dayStocks: {},
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
                '/newstock/' +
                value +
                '/' +
                productCode,
        );
    };

    return (
        <>
            <div className="sales-header">
                <h3 className="signage">New {codeName} Stock</h3>
                <ProductCodes handleSelect={handleSelect} selectedCode={productCode} />
                <div className="card card-wrapper" style={{ marginTop: '20px' }}>
                    {!isLoading && (
                        <StocksFormPage getDayWetStocks={getDayWetStocks} getDayDryStocks={getDayDryStocks} />
                    )}
                    <DayStocks />
                </div>
            </div>
        </>
    );
};

NewStock.propTypes = {
    setProductCode: PropTypes.any,
    history: PropTypes.any,
    productCode: PropTypes.any,
    fetchDayStocks: PropTypes.any,
};

const mapStateToProps = (state: AppState): ProductsState => ({
    productCode: state.productsRoot.productCode,
});

export default connect(mapStateToProps, { setProductCode, fetchDayStocks })(NewStock);
