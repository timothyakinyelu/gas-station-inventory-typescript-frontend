/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

interface DrySalesFormProps {
    handleSubmit: (stationID?: string, codeID?: string, dateOfSale?: string, foreCourts?: any[]) => void;
    products: any[];
}

const DrySalesForm: React.FC<DrySalesFormProps> = (props): JSX.Element => {
    const { handleSubmit, products } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [dateOfSale, setDateOfSale] = useState<string | undefined>('');

    const [foreCourts, setForeCourts] = useState([
        {
            productID: Number(),
            unitPrice: Number(),
            quantitySold: Number(),
            amount: Number(),
        },
    ]);

    const { stationID, codeID } = useParams();

    function product(): any {
        const items = products;

        if (items) {
            return items.map((product) => {
                return (
                    <option key={product.id} value={product.id} data-price={product.price}>
                        {product.product}
                    </option>
                );
            });
        }
    }

    const handleProductChange = (idx: number) => (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const index = e.target.selectedIndex;
        const price = e.target[index].getAttribute('data-price') || undefined;

        const newForeCourts = foreCourts.map((foreCourt, sidx) => {
            if (idx !== sidx) return foreCourt;
            return {
                ...foreCourt,
                productID: Number(e.target.value),
                unitPrice: Number(price),
            };
        });

        setForeCourts(newForeCourts);
    };

    const handleQuantitySoldChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newForeCourts = foreCourts.map((foreCourt, sidx) => {
            if (idx !== sidx) return foreCourt;
            return {
                ...foreCourt,
                quantitySold: Number(evt.target.value),
            };
        });

        setForeCourts(newForeCourts);
    };

    const getTotalAmount = (idx: number) => (): void => {
        const newForeCourts = foreCourts.map((foreCourt, sidx) => {
            if (idx !== sidx) return foreCourt;
            return {
                ...foreCourt,
                amount: Number(foreCourt.unitPrice) * Number(foreCourt.quantitySold),
            };
        });

        setForeCourts(newForeCourts);
    };

    const handleAddForeCourt = (): void => {
        setForeCourts(
            foreCourts.concat([
                {
                    productID: Number(),
                    unitPrice: Number(),
                    quantitySold: Number(),
                    amount: Number(),
                },
            ]),
        );
    };

    const handleRemoveForeCourt = (idx: number) => (): void => {
        setForeCourts(foreCourts.filter((s, sidx) => idx !== sidx));
    };

    const addSale = (
        evt: React.FormEvent<HTMLFormElement>,
        stationID?: string,
        codeID?: string,
        dateOfSale?: string,
        foreCourts?: any[],
    ): void => {
        evt.preventDefault();

        setIsLoading(true);
        handleSubmit(stationID, codeID, dateOfSale, foreCourts);

        setTimeout(() => {
            setForeCourts([
                {
                    productID: Number(),
                    unitPrice: Number(),
                    quantitySold: Number(),
                    amount: Number(),
                },
            ]);
            setDateOfSale('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Form
            onSubmit={(evt: React.FormEvent<HTMLFormElement>): void =>
                addSale(evt, stationID, codeID, dateOfSale, foreCourts)
            }
        >
            <Form.Group
                className="col-lg-3 col-sm-3"
                style={{ paddingLeft: '0px', paddingRight: '0px' }}
                controlId="dateSale"
            >
                <Form.Label>Date of Sale</Form.Label>
                <Form.Control
                    type="date"
                    value={dateOfSale || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDateOfSale(e.target.value)}
                />
            </Form.Group>
            {foreCourts.map((foreCourt, idx) => (
                <Form.Row key={`${idx + 1}`}>
                    <Form.Group className="col-lg-3 col-sm-3" controlId="2">
                        <Form.Label>Product</Form.Label>
                        <Form.Control
                            className="modalSelect"
                            as="select"
                            value={foreCourt.productID.toString() || ''}
                            onChange={handleProductChange(idx)}
                        >
                            <option value="">-SELECT A PRODUCT-</option>
                            {product()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control value={foreCourt.unitPrice.toString() || ''} readOnly />
                    </Form.Group>
                    <Form.Group className="col-lg-3 col-sm-3" controlId="qTS">
                        <Form.Label>Litres Sold</Form.Label>
                        <Form.Control
                            type="text"
                            value={foreCourt.quantitySold.toString() || ''}
                            onChange={handleQuantitySoldChange(idx)}
                            onKeyUp={getTotalAmount(idx)}
                        />
                    </Form.Group>
                    <Form.Group className="col-lg-3 col-sm-3" controlId="aM">
                        <Form.Label>Total Amount</Form.Label>
                        <Form.Control type="text" value={foreCourt.amount.toString() || ''} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" onClick={handleRemoveForeCourt(idx)} className="small btnRemove">
                            X
                        </Button>
                    </Form.Group>
                </Form.Row>
            ))}
            <Button onClick={handleAddForeCourt} className="addBtn">
                <i className="fa fa-plus"></i>
            </Button>
            <Button className="float-right btnSubmit" variant="primary" type="submit">
                {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                Submit
            </Button>
        </Form>
    );
};

DrySalesForm.propTypes = {
    handleSubmit: PropTypes.any,
    products: PropTypes.any,
};

export default DrySalesForm;
