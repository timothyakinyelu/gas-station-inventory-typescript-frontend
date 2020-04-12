/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import '../../styles/stations.css';
import { AppState } from '../../redux';
import { ProductsState, ProductCode } from '../../redux/products/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

interface ProductCodesProps {
    productCodes?: ProductCode[];
    selectedCode?: ProductCode;
    handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProductCodes: React.FC<ProductCodesProps> = ({ productCodes, selectedCode, handleSelect }): JSX.Element => {
    const [objects, setObjects] = useState<ProductCode[] | undefined>([]);
    useEffect(() => {
        async function onLoad(): Promise<any> {
            if (!productCodes) {
                return;
            }

            setObjects(productCodes);
        }

        onLoad();
    }, [productCodes]);

    const options = (): any => {
        if (objects) {
            return objects.map((object) => {
                return (
                    <option key={object.id} value={object.id} data-name={object.code}>
                        {object.code}
                    </option>
                );
            });
        }
    };

    return (
        <>
            <div className="select">
                <select
                    name="slct"
                    id="slct"
                    value={selectedCode?.id || ''}
                    onChange={(e): void => {
                        handleSelect(e);
                    }}
                >
                    <option disabled value="">
                        Choose a code
                    </option>
                    {options()}
                </select>
            </div>
        </>
    );
};

ProductCodes.propTypes = {
    productCodes: PropTypes.array,
    selectedCode: PropTypes.any,
    handleSelect: PropTypes.any,
};

const mapStateToProps = (state: AppState): ProductsState => ({
    productCodes: state.productsRoot.productCodes,
});

export default connect(mapStateToProps)(ProductCodes);
