/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Supply, SuppliesState } from '../../redux/supplies/types';
import supply from '../../api/supply';
import { addToast } from '../../redux/toast/actions';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { Products, Product } from '../../redux/products/types';

interface EditSupplyModalProps {
    editSupply?: Supply;
    getSupplies: () => void;
    addToast: typeof addToast;
    show?: boolean;
    onHide?: () => void;
    products: Products;
}

const EditSupplyModal: React.FC<EditSupplyModalProps> = (props): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const [productID, setProductID] = useState<number>();
    const [received, setReceived] = useState<number>();
    const [supplyPrice, setSupplyPrice] = useState<number>();
    const [supplyDate, setSupplyDate] = useState<string | undefined>('');

    const { getSupplies, editSupply, addToast, products, ...rest } = props;
    const count = Math.random() * 100 + 1;

    function options(): any {
        if (products) {
            return products?.data?.map((product: Product) => {
                return (
                    <option key={product.id} value={product.id}>
                        {product.product}
                    </option>
                );
            });
        }
    }

    useEffect(() => {
        if (!editSupply) {
            return;
        }

        setProductID(editSupply?.product_id);
        setReceived(editSupply?.inventory_received);
        setSupplyPrice(editSupply?.supply_price);
        setSupplyDate(editSupply?.date_of_supply);
    }, [editSupply]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        // console.log(avatar)
        const supplyID = editSupply?.id;
        try {
            supply
                .updateSupply(supplyID, productID, received, supplyPrice, supplyDate)
                .then((res) => {
                    setIsLoading(false);
                    addToast({
                        id: count,
                        message: res.data.success,
                    });

                    getSupplies();
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

        setIsLoading(true);
    };

    return (
        <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="2">
                        <Form.Label>Product</Form.Label>
                        <Form.Control
                            value={productID?.toString() || ''}
                            as="select"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
                                setProductID(Number(e.target.value))
                            }
                        >
                            <option value="">-SELECT A PRODUCT-</option>
                            {options()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="amount">
                        <Form.Label>Inventory Received</Form.Label>
                        <Form.Control
                            type="text"
                            value={received?.toString() || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                setReceived(Number(e.target.value))
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="ref">
                        <Form.Label>Supply Price</Form.Label>
                        <Form.Control
                            type="text"
                            value={supplyPrice?.toString() || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                setSupplyPrice(Number(e.target.value))
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="expenseDate">
                        <Form.Label>Date of Supply</Form.Label>
                        <Form.Control
                            type="date"
                            value={supplyDate || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSupplyDate(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modal-button btnSubmit" onClick={handleSubmit}>
                    {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

EditSupplyModal.propTypes = {
    getSupplies: PropTypes.any,
    editSupply: PropTypes.any,
    addToast: PropTypes.any,
    show: PropTypes.bool,
    onHide: PropTypes.any,
    products: PropTypes.any,
};

const mapStateToProps = (state: AppState): SuppliesState => ({
    editSupply: state.suppliesRoot.editSupply,
});

export default connect(mapStateToProps, { addToast })(EditSupplyModal);
