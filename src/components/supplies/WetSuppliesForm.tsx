/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

interface WetSuppliesFormProps {
    handleSubmit: (
        stationID?: string,
        codeID?: string,
        productID?: number,
        dateOfSupply?: string,
        supplyPrice?: number,
        items?: any[],
    ) => void;
    products: any[];
}

const WetSuppliesForm: React.FC<WetSuppliesFormProps> = (props): JSX.Element => {
    const { handleSubmit, products } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [productID, setProductID] = useState<number>();
    const [dateOfSupply, setDateOfSupply] = useState<string | undefined>('');
    const [supplyPrice, setSupplyPrice] = useState<number>();

    const [items, setItems] = useState([
        {
            tankCode: '',
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
                    received: Number(),
                },
            ]),
        );
    };

    const handleRemoveItem = (idx: number) => (): void => {
        setItems(items.filter((s, sidx) => idx !== sidx));
    };

    const addSupply = (
        evt: React.FormEvent<HTMLFormElement>,
        stationID?: string,
        codeID?: string,
        productID?: number,
        dateOfSupply?: string,
        supplyPrice?: number,
        items?: any[],
    ): void => {
        evt.preventDefault();

        setIsLoading(true);
        handleSubmit(stationID, codeID, productID, dateOfSupply, supplyPrice, items);

        setTimeout(() => {
            setItems([
                {
                    tankCode: '',
                    received: Number(),
                },
            ]);
            setProductID(Number());
            setDateOfSupply('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Form
            onSubmit={(evt: React.FormEvent<HTMLFormElement>): void =>
                addSupply(evt, stationID, codeID, productID, dateOfSupply, supplyPrice, items)
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
                    <Form.Label>Date of Supply</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateOfSupply || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDateOfSupply(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="col-lg-2 col-sm-2" controlId="eDM">
                    <Form.Label>Supply Price</Form.Label>
                    <Form.Control
                        type="text"
                        value={supplyPrice?.toString() || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                            setSupplyPrice(Number(e.target.value))
                        }
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
                        <Form.Label>Received</Form.Label>
                        <Form.Control
                            type="text"
                            value={item.received.toString() || ''}
                            onChange={handleReceivedChange(idx)}
                        />
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

WetSuppliesForm.propTypes = {
    handleSubmit: PropTypes.any,
    products: PropTypes.any,
};

export default WetSuppliesForm;
