/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Stock, StocksState } from '../../redux/stocks/types';
import stock from '../../api/stock';
import { addToast } from '../../redux/toast/actions';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { Products, Product } from '../../redux/products/types';

interface EditStockModalProps {
    editStock?: Stock;
    getStocks: () => void;
    addToast: typeof addToast;
    show?: boolean;
    onHide?: () => void;
    products: Products;
}

const EditStockModal: React.FC<EditStockModalProps> = (props): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const [productID, setProductID] = useState<number>();
    const [tankCode, setTankCode] = useState<string | undefined>('');
    const [openStock, setOpenStock] = useState<number>();
    const [closeStock, setCloseStock] = useState<number>();
    const [received, setReceived] = useState<number>();
    const [sold, setSold] = useState<number>();
    const [stockDate, setStockDate] = useState<string | undefined>('');

    const { getStocks, editStock, addToast, products, ...rest } = props;
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
        if (!editStock) {
            return;
        }

        setProductID(editStock.product_id);
        setTankCode(editStock.tank_code);
        setOpenStock(editStock.open_stock);
        setCloseStock(editStock.close_stock);
        setSold(editStock.inventory_sold);
        setReceived(editStock.inventory_received);
        setStockDate(editStock.date_of_inventory);
    }, [editStock]);

    function getStockSold(): void {
        if (openStock === undefined || closeStock === undefined || received === undefined) return;
        setSold(openStock - (closeStock - received));
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        // console.log(avatar)
        const stockID = editStock?.id;
        try {
            stock
                .updateStock(stockID, productID, tankCode, openStock, closeStock, sold, received, stockDate)
                .then((res) => {
                    setIsLoading(false);
                    addToast({
                        id: count,
                        message: res.data.success,
                    });

                    getStocks();
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
                            className="modalSelect"
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
                    {editStock?.tank_code && (
                        <Form.Group controlId="amount">
                            <Form.Label>Tank Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={tankCode || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTankCode(e.target.value)}
                            />
                        </Form.Group>
                    )}
                    <Form.Group controlId="opStock">
                        <Form.Label>Opening Stock</Form.Label>
                        <Form.Control
                            type="text"
                            value={openStock?.toString() || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                setOpenStock(Number(e.target.value))
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="clstock">
                        <Form.Label>Closing Stock</Form.Label>
                        <Form.Control
                            type="text"
                            value={closeStock?.toString() || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                setCloseStock(Number(e.target.value))
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="ref">
                        <Form.Label>Inventory Received</Form.Label>
                        <Form.Control
                            type="text"
                            value={received?.toString() || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                setReceived(Number(e.target.value))
                            }
                            onKeyUp={getStockSold}
                        />
                    </Form.Group>
                    <Form.Group controlId="sold">
                        <Form.Label>Inventory Sold</Form.Label>
                        <Form.Control type="text" value={sold?.toString() || ''} readOnly />
                    </Form.Group>
                    <Form.Group controlId="stockDate">
                        <Form.Label>Date of Inventory</Form.Label>
                        <Form.Control
                            type="date"
                            value={stockDate || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setStockDate(e.target.value)}
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

EditStockModal.propTypes = {
    getStocks: PropTypes.any,
    editStock: PropTypes.any,
    addToast: PropTypes.any,
    show: PropTypes.bool,
    onHide: PropTypes.any,
    products: PropTypes.any,
};

const mapStateToProps = (state: AppState): StocksState => ({
    editStock: state.stocksRoot.editStock,
});

export default connect(mapStateToProps, { addToast })(EditStockModal);
