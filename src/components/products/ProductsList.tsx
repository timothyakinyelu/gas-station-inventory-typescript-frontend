/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { AppState } from '../../redux';
import { ProductsState, Products, FETCH_PRODUCTS } from '../../redux/products/types';
import DataTable from '../../reusables/partials/DataTable';
import PropTypes from 'prop-types';
import product from '../../api/product';
import { addToast } from '../../redux/toast/actions';
import { useParams, useHistory, useLocation } from 'react-router-dom';

interface ProductsListProp {
    products?: Products;
    addToast?: typeof addToast;
    getProducts: () => void;
    handleEdit: (value?: number) => void;
}

const ProductsList: React.FC<ProductsListProp> = (props): JSX.Element => {
    const { products } = props;

    const items = products;
    const count = Math.random() * 100 + 1;

    const history = useHistory();
    const dispatch = useDispatch();
    const { companyID, company } = useParams();

    function useQuery(): any {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const page = query.get('page');

    const fetchData = useCallback(
        (pageNumber: number): any => {
            product.getProducts(companyID, pageNumber).then((res) => {
                dispatch({
                    type: FETCH_PRODUCTS,
                    payload: {
                        products: res.data,
                    },
                });
            });

            history.push('/' + companyID + '/' + company + '/products?page=' + pageNumber);
        },
        [dispatch, history, companyID, company],
    );

    const changePage = useCallback(
        (pageNumber: number): void => {
            if (pageNumber) {
                fetchData(pageNumber);
            }
        },
        [fetchData],
    );

    useEffect(() => {
        const ac = new AbortController();
        if (!page) {
            return;
        }

        fetchData(page);
        changePage(page);
        return function cleanup(): void {
            ac.abort();
        };
    }, [page, changePage, fetchData]);

    const deleteSelected = (data?: any[]): void => {
        product.deleteProduct(data).then((res) => {
            addToast({
                id: count,
                message: res.data.status,
            });
            props.getProducts();
        });
    };

    return (
        <div className="list-table">
            <div className="list-table-inner">
                {items?.data && (
                    <DataTable
                        items={items}
                        deleteSelected={deleteSelected}
                        changePage={changePage}
                        handleEdit={props.handleEdit}
                    />
                )}
            </div>
        </div>
    );
};

ProductsList.propTypes = {
    products: PropTypes.object,
    addToast: PropTypes.any,
    getProducts: PropTypes.any,
    handleEdit: PropTypes.any,
};

const mapStateToProps = (state: AppState): ProductsState => ({
    products: state.productsRoot.products,
});

export default connect(mapStateToProps, { addToast })(ProductsList);
