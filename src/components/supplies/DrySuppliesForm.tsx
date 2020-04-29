/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

interface DrySuppliesFormProps {
    handleSubmit: (stationID?: string, codeID?: string, dateOfSupply?: string, items?: any[]) => void;
    products: any[];
}

const DrySuppliesForm: React.FC<DrySuppliesFormProps> = (props): JSX.Element => {
    const { handleSubmit, products } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [dateOfSupply, setDateOfSupply] = useState<string | undefined>('');

    const [items, setItems] = useState([
        {
            productID: Number(),
            received: Number(),
            supplyPrice: Number(),
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

    const handleProductChange = (idx: number) => (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const newItems = items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                productID: Number(e.target.value),
            };
        });

        setItems(newItems);
    };

    const handleSupplyPriceChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newItems = items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                supplyPrice: Number(evt.target.value),
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
                    productID: Number(),
                    received: Number(),
                    supplyPrice: Number(),
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
        dateOfSupply?: string,
        items?: any[],
    ): void => {
        evt.preventDefault();

        setIsLoading(true);
        handleSubmit(stationID, codeID, dateOfSupply, items);

        setTimeout(() => {
            setItems([
                {
                    productID: Number(),
                    received: Number(),
                    supplyPrice: Number(),
                },
            ]);
            setDateOfSupply('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Form
            onSubmit={(evt: React.FormEvent<HTMLFormElement>): void =>
                addSupply(evt, stationID, codeID, dateOfSupply, items)
            }
        >
            <Form.Group
                className="col-lg-3 col-sm-3"
                style={{ paddingLeft: '0px', paddingRight: '0px' }}
                controlId="dateSale"
            >
                <Form.Label>Date of Entry</Form.Label>
                <Form.Control
                    type="date"
                    value={dateOfSupply || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDateOfSupply(e.target.value)}
                />
            </Form.Group>
            {items.map((item, idx) => (
                <Form.Row key={`${idx + 1}`}>
                    <Form.Group className="col-lg-3 col-sm-3" controlId="2">
                        <Form.Label>Product</Form.Label>
                        <Form.Control
                            className="modalSelect"
                            as="select"
                            value={item.productID.toString() || ''}
                            onChange={handleProductChange(idx)}
                        >
                            <option value="">-SELECT A PRODUCT-</option>
                            {product()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="eST">
                        <Form.Label>Supply Price</Form.Label>
                        <Form.Control
                            type="text"
                            value={item.supplyPrice.toString() || ''}
                            onChange={handleSupplyPriceChange(idx)}
                        />
                    </Form.Group>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="rD">
                        <Form.Label>Received</Form.Label>
                        <Form.Control
                            type="number"
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

DrySuppliesForm.propTypes = {
    handleSubmit: PropTypes.any,
    products: PropTypes.any,
};

export default DrySuppliesForm;
