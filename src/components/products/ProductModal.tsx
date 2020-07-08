/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { addToast } from '../../redux/toast/actions';
import { connect } from 'react-redux';
import product from '../../api/product';
import { Product } from '../../redux/products/types';
import { useParams } from 'react-router-dom';

interface ProductModalProps {
    show?: boolean;
    onHide?: () => void;
    addToast: typeof addToast;
    getProducts: () => void;
    editProduct?: Product;
    productCodes: any[];
    productTypes: any[];
}

const ProductModal: React.FC<ProductModalProps> = (props): JSX.Element => {
    const [name, setName] = useState<string | undefined>('');
    const [productTypeId, setProductTypeId] = useState<number>();
    const [productCodeId, setProductCodeId] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [isLoading, setIsLoading] = useState(false);

    const { getProducts, productCodes, productTypes, addToast, editProduct, ...rest } = props;
    const { companyID } = useParams();
    const count = Math.random() * 100 + 1;
    const id = editProduct?.id;

    useEffect(() => {
        if (id === undefined) {
            return;
        }

        setProductCodeId(editProduct?.product_code_id);
        setName(editProduct?.name);
        setPrice(editProduct?.price);
    }, [id, editProduct]);

    function productCode(): any {
        const codes = productCodes;

        if (codes) {
            return codes.map((code) => {
                return (
                    <option key={code.id} value={code.id}>
                        {code.code}
                    </option>
                );
            });
        }
    }

    function productType(): any {
        const types = productTypes;

        if (types) {
            return types.map((type) => {
                return (
                    <option key={type.id} value={type.id}>
                        {type.name}
                    </option>
                );
            });
        }
    }

    const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();

        try {
            product
                .storeProduct(companyID, productTypeId, productCodeId, name, price)
                .then((res) => {
                    setIsLoading(false);
                    setProductTypeId(Number(''));
                    setProductCodeId(Number(''));
                    setName('');
                    setPrice(Number(''));

                    addToast({
                        id: count,
                        message: res.data.success,
                    });

                    getProducts();
                })
                .catch((err) => {
                    addToast({
                        id: count,
                        message: err.response.data.error,
                    });
                });
        } catch (e) {
            // alert(e);
            setIsLoading(false);
        }
        setIsLoading(true);
    };

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();

        const productID = editProduct?.id;
        try {
            product
                .updateProduct(productID, productCodeId, name, price)
                .then((res) => {
                    setIsLoading(false);
                    addToast({
                        id: count,
                        message: res.data.success,
                    });
                    getProducts();
                })
                .catch((err) => {
                    addToast({
                        id: count,
                        message: err.response.data.error,
                    });
                });
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
        // props.onHide();
        setIsLoading(true);
    };

    return (
        <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                {editProduct?.id === undefined ? (
                    <Modal.Title id="contained-modal-title-vcenter">New Product</Modal.Title>
                ) : (
                    <Modal.Title id="contained-modal-title-vcenter">Edit {editProduct?.name}</Modal.Title>
                )}
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {editProduct?.id === undefined && (
                        <Form.Group controlId="2">
                            <Form.Label>Product Type</Form.Label>
                            <Form.Control
                                className="modalSelect"
                                value={productTypeId?.toString() || ''}
                                as="select"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
                                    setProductTypeId(Number(e.target.value))
                                }
                            >
                                <option value="">-SELECT A PRODUCT TYPE-</option>
                                {productType()}
                            </Form.Control>
                        </Form.Group>
                    )}
                    <Form.Group controlId="3">
                        <Form.Label>Product Code</Form.Label>
                        <Form.Control
                            className="modalSelect"
                            value={productCodeId?.toString() || ''}
                            as="select"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
                                setProductCodeId(Number(e.target.value))
                            }
                        >
                            <option value="">-SELECT A PRODUCT CODE-</option>
                            {productCode()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Petrol"
                            value={name || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={price?.toString() || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                setPrice(Number(e.target.value))
                            }
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {editProduct?.id === undefined ? (
                    <Button className="modal-button" onClick={handleSave}>
                        {isLoading && (
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        )}
                        Save
                    </Button>
                ) : (
                    <Button className="modal-button" onClick={handleUpdate}>
                        {isLoading && (
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        )}
                        Update
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

ProductModal.propTypes = {
    show: PropTypes.bool,
    addToast: PropTypes.any,
    getProducts: PropTypes.any,
    editProduct: PropTypes.object,
    productCodes: PropTypes.any,
    productTypes: PropTypes.any,
    onHide: PropTypes.any,
};

export default connect(null, { addToast })(ProductModal);
