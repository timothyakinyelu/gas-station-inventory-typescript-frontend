/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setProductCode } from '../../redux/products/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductCodes from '../../reusables/partials/ProductCodes';
import { AppState } from '../../redux';
import { ProductsState, ProductCode } from '../../redux/products/types';
import sale from '../../api/sale';
import SalesFormPage from '../../components/sales/SalesFormPage';
import { fetchDaySales } from '../../redux/sales/actions';
import DaySales from '../../components/sales/DaySales';

interface NewSaleProps {
    setProductCode: typeof setProductCode;
    fetchDaySales: typeof fetchDaySales;
    history: any;
    productCode?: ProductCode;
}
const NewSale: React.FC<NewSaleProps> = (props): JSX.Element => {
    const { setProductCode, history, productCode, fetchDaySales } = props;

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

    function getDayWetSales(stationID?: string, productID?: number, dateOfSale?: string): any {
        sale.getDaySalesByProductID(stationID, productID, dateOfSale).then((res) => {
            fetchDaySales({
                daySales: res.data,
            });
        });
    }

    function getDayDrySales(stationID?: string, productCodeID?: string, dateOfSale?: string): any {
        sale.getDaySalesByProductCodeID(stationID, productCodeID, dateOfSale).then((res) => {
            fetchDaySales({
                daySales: res.data,
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
        fetchDaySales({
            daySales: {},
        });

        setIsLoading(false);

        history.push(
            '/' + companyID + '/' + company + '/' + stationID + '/' + station + '/newsale/' + value + '/' + productCode,
        );
    };

    return (
        <>
            <div className="sales-header">
                <h3 className="signage">New {codeName} Sale</h3>
                <ProductCodes handleSelect={handleSelect} selectedCode={productCode} />
                <div className="card card-wrapper" style={{ marginTop: '20px' }}>
                    {!isLoading && <SalesFormPage getDayWetSales={getDayWetSales} getDayDrySales={getDayDrySales} />}
                    <DaySales />
                </div>
            </div>
        </>
    );
};

NewSale.propTypes = {
    setProductCode: PropTypes.any,
    history: PropTypes.any,
    productCode: PropTypes.any,
    fetchDaySales: PropTypes.any,
};

const mapStateToProps = (state: AppState): ProductsState => ({
    productCode: state.productsRoot.productCode,
});

export default connect(mapStateToProps, { setProductCode, fetchDaySales })(NewSale);
