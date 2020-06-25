/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

interface WetStocksFormProps {
    handleSubmit: (
        stationID?: string,
        codeID?: string,
        productID?: number,
        dateOfInventory?: string,
        items?: any[],
    ) => void;
    products: any[];
}

const WetStocksForm: React.FC<WetStocksFormProps> = (props): JSX.Element => {
    const { handleSubmit, products } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [productID, setProductID] = useState<number>();
    const [dateOfInventory, setDateOfInventory] = useState<string | undefined>('');

    const [items, setItems] = useState([
        {
            tankCode: '',
            startStock: Number(),
            endStock: Number(),
            quantitySold: Number(),
            received: Number(),
        },
    ]);

    const { stationID, codeID } = useParams();

    function product(): any {
        const items = products;

        if (items) {
            return items.map((product) => {
                return (
                    <option key={product.id} value={product.id}>
                        {product.product}
                    </option>
                );
            });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setProductID(Number(e.target.value));
    };

    const handleTankCodeChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newItems = items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                tankCode: evt.target.value,
            };
        });

        setItems(newItems);
    };

    const handleStartStockChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newItems = items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                startStock: Number(evt.target.value),
            };
        });

        setItems(newItems);
    };

    const handleEndStockChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newItems = items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                endStock: Number(evt.target.value),
            };
        });

        setItems(newItems);
    };

    const getQuantitySold = (idx: number) => (): void => {
        const newItems = items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                quantitySold: Number(item.startStock) - (Number(item.endStock) - Number(item.received)),
            };
        });

        setItems(newItems);
    };

    const handleReceivedChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newItems = items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                received: Number(evt.target.value),
            };
        });

        setItems(newItems);
    };

    const handleAddItem = (): void => {
        setItems(
            items.concat([
                {
                    tankCode: '',
                    startStock: Number(),
                    endStock: Number(),
                    quantitySold: Number(),
                    received: Number(),
                },
            ]),
        );
    };

    const handleRemoveItem = (idx: number) => (): void => {
        setItems(items.filter((s, sidx) => idx !== sidx));
    };

    const addStock = (
        evt: React.FormEvent<HTMLFormElement>,
        stationID?: string,
        codeID?: string,
        productID?: number,
        dateOfInventory?: string,
        items?: any[],
    ): void => {
        evt.preventDefault();

        setIsLoading(true);
        handleSubmit(stationID, codeID, productID, dateOfInventory, items);

        setTimeout(() => {
            setItems([
                {
                    tankCode: '',
                    startStock: Number(),
                    endStock: Number(),
                    quantitySold: Number(),
                    received: Number(),
                },
            ]);
            setProductID(Number());
            setDateOfInventory('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Form
            onSubmit={(evt: React.FormEvent<HTMLFormElement>): void =>
                addStock(evt, stationID, codeID, productID, dateOfInventory, items)
            }
        >
            <Form.Row>
                <Form.Group className="col-lg-4 col-sm-4" controlId="2">
                    <Form.Label>Product</Form.Label>
                    <Form.Control
                        className="modalSelect"
                        as="select"
                        value={productID?.toString() || ''}
                        onChange={handleChange}
                    >
                        <option value="">-SELECT A PRODUCT-</option>
                        {product()}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="col-lg-4 col-sm-4" controlId="dateSale">
                    <Form.Label>Date of Entry</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateOfInventory || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDateOfInventory(e.target.value)}
                    />
                </Form.Group>
            </Form.Row>
            {items.map((item, idx) => (
                <Form.Row key={`${idx + 1}`}>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="pMC">
                        <Form.Label>Tank Code</Form.Label>
                        <Form.Control type="text" value={item.tankCode || ''} onChange={handleTankCodeChange(idx)} />
                    </Form.Group>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="stM">
                        <Form.Label>Start Stock</Form.Label>
                        <Form.Control
                            type="text"
                            value={item.startStock.toString() || ''}
                            onChange={handleStartStockChange(idx)}
                        />
                    </Form.Group>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="eDM">
                        <Form.Label>End Stock</Form.Label>
                        <Form.Control
                            type="text"
                            value={item.endStock.toString() || ''}
                            onChange={handleEndStockChange(idx)}
                        />
                    </Form.Group>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="rD">
                        <Form.Label>Received</Form.Label>
                        <Form.Control
                            type="text"
                            value={item.received.toString() || ''}
                            onChange={handleReceivedChange(idx)}
                            onKeyUp={getQuantitySold(idx)}
                        />
                    </Form.Group>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="qTS">
                        <Form.Label>Litres Sold</Form.Label>
                        <Form.Control type="text" value={item.quantitySold.toString() || ''} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" onClick={handleRemoveItem(idx)} className="small btnRemove">
                            X
                        </Button>
                    </Form.Group>
                </Form.Row>
            ))}
            <Button onClick={handleAddItem} className="addBtn">
                <i className="fa fa-plus"></i>
            </Button>
            <Button className="float-right btnSubmit" variant="primary" type="submit">
                {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                Submit
            </Button>
        </Form>
    );
};

WetStocksForm.propTypes = {
    handleSubmit: PropTypes.any,
    products: PropTypes.any,
};

export default WetStocksForm;
