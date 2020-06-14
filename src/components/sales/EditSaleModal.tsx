/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Sale } from '../../redux/sales/types';
import sale from '../../api/sale';
import { addToast } from '../../redux/toast/actions';
import { connect } from 'react-redux';

interface EditSaleModalProps {
    handleLoad: () => void;
    showEdit?: Sale;
    addToast: typeof addToast;
    show?: boolean;
    onHide?: () => void;
    products: any[];
}

const EditSaleModal: React.FC<EditSaleModalProps> = (props): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const [productID, setProductID] = useState<number>();
    const [unitPrice, setUnitPrice] = useState<number>();
    const [pumpCode, setPumpCode] = useState<string | undefined>('');
    const [startMetre, setStartMetre] = useState<number>();
    const [endMetre, setEndMetre] = useState<number>();
    const [qtySold, setQtySold] = useState<number>();
    const [amount, setAmount] = useState<number>();
    const [dateOfSale, setDateOfSale] = useState<string | undefined>('');

    const { handleLoad, showEdit, addToast, ...rest } = props;
    const count = Math.random() * 100 + 1;

    useEffect(() => {
        if (!showEdit) {
            return;
        }

        setProductID(showEdit.product_id);
        setUnitPrice(showEdit.unit_price);
        setPumpCode(showEdit.pump_code);
        setStartMetre(showEdit.start_metre);
        setEndMetre(showEdit.end_metre);
        setQtySold(showEdit.quantity_sold);
        setAmount(showEdit.amount);
        setDateOfSale(showEdit.date_of_entry);
    }, [showEdit]);

    function product(): any {
        const products = props.products;

        if (products) {
            return products.map((product) => {
                return (
                    <option key={product.id} value={product.id}>
                        {product.product}
                    </option>
                );
            });
        }
    }

    const getQuantitySold = (): void => {
        // setQtySold(Number(endMetre) - Number(startMetre));
        if (!qtySold) {
            return;
        } else {
            if (unitPrice === undefined) return;
            setAmount(+Number(unitPrice * +Number(qtySold)));
        }
    };

    const getTotalAmount = (): void => {
        if (unitPrice === undefined) return;
        setAmount(Number(unitPrice * Number(qtySold)));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        // console.log(avatar)
        const saleID = showEdit?.id;
        try {
            sale.updateDaySale(
                saleID,
                productID,
                unitPrice,
                pumpCode,
                startMetre,
                endMetre,
                qtySold,
                amount,
                dateOfSale,
            )
                .then((res) => {
                    // console.log(res)
                    setIsLoading(false);
                    // setSuccess(res.data.success);
                    addToast({
                        id: count,
                        message: res.data.success,
                    });

                    handleLoad();
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
        // props.onHide();
        setIsLoading(true);
    };

    return (
        <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Sale</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row>
                        <Form.Group className="col-lg-6 col-sm-12" controlId="2">
                            <Form.Label>Product</Form.Label>
                            <Form.Control
                                className="modalSelect"
                                value={productID?.toString() || ''}
                                as="select"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setProductID(Number(e.target.value))
                                }
                            >
                                <option value="">-SELECT A PRODUCT-</option>
                                {product()}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="col-lg-6 col-sm-12" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                value={unitPrice?.toString() || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setUnitPrice(Number(e.target.value))
                                }
                            />
                        </Form.Group>
                    </Form.Row>
                    {pumpCode && (
                        <Form.Row>
                            <Form.Group className="col-lg-4 col-sm-12" controlId="pumpCode">
                                <Form.Label>Pump Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={pumpCode || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                        setPumpCode(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="col-lg-4 col-sm-12" controlId="stMetre">
                                <Form.Label>Start Metre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={startMetre?.toString() || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                        setStartMetre(Number(e.target.value))
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="col-lg-4 col-sm-12" controlId="endMetre">
                                <Form.Label>End Metre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={endMetre?.toString() || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                        setEndMetre(Number(e.target.value))
                                    }
                                    onKeyUp={(): void => setQtySold(Number(endMetre) - Number(startMetre))}
                                    onClick={(): void => getQuantitySold()}
                                />
                            </Form.Group>
                        </Form.Row>
                    )}
                    <Form.Row>
                        <Form.Group className="col-lg-4 col-sm-12" controlId="qtySold">
                            <Form.Label>Quantity Sold</Form.Label>
                            <Form.Control
                                type="text"
                                value={qtySold?.toString() || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setQtySold(Number(e.target.value))
                                }
                                onKeyUp={getTotalAmount}
                            />
                        </Form.Group>
                        <Form.Group className="col-lg-4 col-sm-12" controlId="address">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" value={amount?.toString() || ''} readOnly />
                        </Form.Group>
                        <Form.Group className="col-lg-4 col-sm-12" controlId="dateSale">
                            <Form.Label>Date of Sale</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateOfSale || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setDateOfSale(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form.Row>
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

EditSaleModal.propTypes = {
    handleLoad: PropTypes.any,
    showEdit: PropTypes.any,
    addToast: PropTypes.any,
    show: PropTypes.bool,
    onHide: PropTypes.any,
    products: PropTypes.any,
};
export default connect(null, { addToast })(EditSaleModal);
