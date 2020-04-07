import React, { useCallback, useEffect, useState } from 'react';
import product from '../../api/product';
import { fetchProducts, fetchProductToEdit } from '../../redux/products/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductsList from '../../components/products/ProductsList';
import Loader from '../../reusables/Loader';
import { AddButton } from '../../reusables/partials/Buttons';
import { addToast } from '../../redux/toast/actions';
import ProductModal from '../../components/products/ProductModal';

interface ProductsProp {
    fetchProducts: typeof fetchProducts;
    fetchProductToEdit: typeof fetchProductToEdit;
    addToast: typeof addToast;
}

const Products: React.FC<ProductsProp> = (props): JSX.Element => {
    const { fetchProducts, fetchProductToEdit } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const count = Math.random() * 100 + 1;

    const getProducts = useCallback(() => {
        product.getProducts().then((res) => {
            fetchProducts({
                products: res.data,
            });
            setIsLoading(false);
        });
    }, [fetchProducts]);

    useEffect(() => {
        const ac = new AbortController();

        getProducts();
        setIsFetched(true);

        return function cleanup(): void {
            setIsFetched(false);
            ac.abort();
        };
    }, [getProducts]);

    function handleShow(): void {
        setModalShow(true);
        setLoading(false);
    }

    const handleEdit = (id?: number): void => {
        setModalShow(true);
        setLoading(true);
        try {
            product
                .editProduct(id)
                .then((res) => {
                    fetchProductToEdit({
                        editProduct: res.data.product,
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    props.addToast({
                        id: count,
                        message: err.response.data.error,
                    });
                });
        } catch (e) {
            console.log(e.response);
        }
    };

    return (
        <>
            <div className="sales-header">
                <h3 className="signage">Service Station Products</h3>
                {!isFetched ? (
                    <div className="list-table">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <AddButton handleShow={handleShow} />
                        {!isLoading && <ProductsList getProducts={getProducts} />}
                        {!loading && <ProductModal show={modalShow} />}
                    </>
                )}
            </div>
        </>
    );
};

Products.propTypes = {
    fetchProducts: PropTypes.any,
    fetchProductToEdit: PropTypes.any,
    addToast: PropTypes.any,
};

export default connect(null, { fetchProducts, fetchProductToEdit, addToast })(Products);
