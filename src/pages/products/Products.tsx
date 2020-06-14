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
import { AppState } from '../../redux';
import { ProductsState, Product } from '../../redux/products/types';
import { useParams } from 'react-router-dom';

interface ProductsProp {
    fetchProducts: typeof fetchProducts;
    fetchProductToEdit: typeof fetchProductToEdit;
    editProduct?: Product;
    addToast: typeof addToast;
}

const Products: React.FC<ProductsProp> = (props): JSX.Element => {
    const { fetchProducts, fetchProductToEdit, editProduct } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [productCodes, setProductCodes] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const { companyID } = useParams();

    const count = Math.random() * 100 + 1;

    const getProducts = useCallback(() => {
        product.getProducts(companyID).then((res) => {
            fetchProducts({
                products: res.data,
            });
            setIsLoading(false);
        });
    }, [fetchProducts, companyID]);

    const getProductTypes = useCallback(() => {
        product.getProductTypes().then((res) => {
            setProductTypes(res.data);
        });
    }, []);

    const getProductCodes = useCallback(() => {
        product.getProductCodes().then((res) => {
            setProductCodes(res.data);
        });
    }, []);

    useEffect(() => {
        const ac = new AbortController();

        getProducts();
        getProductCodes();
        getProductTypes();
        setIsFetched(true);

        return function cleanup(): void {
            setIsFetched(false);
            ac.abort();
        };
    }, [getProducts, getProductTypes, getProductCodes]);

    function handleShow(): void {
        setModalShow(true);
        setLoading(false);
    }

    const handleHide = (): void => {
        setModalShow(false);
        setLoading(true);
        fetchProductToEdit({
            editProduct: {},
        });
    };

    const handleEdit = (id?: number): void => {
        setModalShow(true);
        setLoading(true);
        // try {
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
        // } catch (e) {
        //     console.log(e.response);
        // }
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
                        {!isLoading && <ProductsList getProducts={getProducts} handleEdit={handleEdit} />}
                        {!loading && (
                            <ProductModal
                                show={modalShow}
                                onHide={handleHide}
                                getProducts={getProducts}
                                productCodes={productCodes}
                                productTypes={productTypes}
                                editProduct={editProduct}
                            />
                        )}
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
    editProduct: PropTypes.object,
};

const mapStateToProps = (state: AppState): ProductsState => ({
    editProduct: state.productsRoot.editProduct,
});

export default connect(mapStateToProps, { fetchProducts, fetchProductToEdit, addToast })(Products);
