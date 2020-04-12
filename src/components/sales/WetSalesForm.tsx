/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

interface WetSalesFormProps {
    handleSubmit: (
        stationID?: string,
        codeID?: string,
        productID?: number,
        unitPrice?: number,
        dateOfSale?: string,
        foreCourts?: any[],
    ) => void;
    products: any[];
}

const WetSalesForm: React.FC<WetSalesFormProps> = (props): JSX.Element => {
    const { handleSubmit, products } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [productID, setProductID] = useState<number>();
    const [unitPrice, setUnitPrice] = useState<number>();
    const [dateOfSale, setDateOfSale] = useState<string | undefined>('');

    const [foreCourts, setForeCourts] = useState([
        {
            pumpCode: '',
            startMetre: Number(),
            endMetre: Number(),
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

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const index = e.target.selectedIndex;
        const price = e.target[index].getAttribute('data-price') || undefined;

        setProductID(Number(e.target.value));
        setUnitPrice(Number(price));
    };

    const handlePumpCodeChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newForeCourts = foreCourts.map((foreCourt, sidx) => {
            if (idx !== sidx) return foreCourt;
            return {
                ...foreCourt,
                pumpCode: evt.target.value,
            };
        });

        setForeCourts(newForeCourts);
    };
    const handleStartMetreChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newForeCourts = foreCourts.map((foreCourt, sidx) => {
            if (idx !== sidx) return foreCourt;
            return {
                ...foreCourt,
                startMetre: Number(evt.target.value),
            };
        });

        setForeCourts(newForeCourts);
    };
    const handleEndMetreChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newForeCourts = foreCourts.map((foreCourt, sidx) => {
            if (idx !== sidx) return foreCourt;
            return {
                ...foreCourt,
                endMetre: Number(evt.target.value),
            };
        });

        setForeCourts(newForeCourts);
    };

    const getQuantitySold = (idx: number) => (): void => {
        const newForeCourts = foreCourts.map((foreCourt, sidx) => {
            if (idx !== sidx) return foreCourt;
            return {
                ...foreCourt,
                quantitySold: Number(foreCourt.endMetre) - Number(foreCourt.startMetre),
            };
        });

        setForeCourts(newForeCourts);
    };

    const getTotalAmount = (idx: number) => (): void => {
        const newForeCourts = foreCourts.map((foreCourt, sidx) => {
            if (idx !== sidx) return foreCourt;
            return {
                ...foreCourt,
                amount: Number(unitPrice) * Number(foreCourt.quantitySold),
            };
        });

        setForeCourts(newForeCourts);
    };

    const handleAddForeCourt = (): void => {
        setForeCourts(
            foreCourts.concat([
                {
                    pumpCode: '',
                    startMetre: Number(),
                    endMetre: Number(),
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
        productID?: number,
        unitPrice?: number,
        dateOfSale?: string,
        foreCourts?: any[],
    ): void => {
        evt.preventDefault();

        setIsLoading(true);
        handleSubmit(stationID, codeID, productID, unitPrice, dateOfSale, foreCourts);

        setTimeout(() => {
            setForeCourts([
                {
                    pumpCode: '',
                    startMetre: Number(),
                    endMetre: Number(),
                    quantitySold: Number(),
                    amount: Number(),
                },
            ]);
            setProductID(Number());
            setUnitPrice(Number());
            setDateOfSale('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Form
            onSubmit={(evt: React.FormEvent<HTMLFormElement>): void =>
                addSale(evt, stationID, codeID, productID, unitPrice, dateOfSale, foreCourts)
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
                <Form.Group className="col-lg-4 col-sm-4" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control value={unitPrice?.toString() || ''} readOnly />
                </Form.Group>
                <Form.Group className="col-lg-4 col-sm-4" controlId="dateSale">
                    <Form.Label>Date of Sale</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateOfSale || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDateOfSale(e.target.value)}
                    />
                </Form.Group>
            </Form.Row>
            {foreCourts.map((foreCourt, idx) => (
                <Form.Row key={`${idx + 1}`}>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="pMC">
                        <Form.Label>Pump Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={foreCourt.pumpCode || ''}
                            onChange={handlePumpCodeChange(idx)}
                        />
                    </Form.Group>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="stM">
                        <Form.Label>Start Metre</Form.Label>
                        <Form.Control
                            type="text"
                            value={foreCourt.startMetre.toString() || ''}
                            onChange={handleStartMetreChange(idx)}
                        />
                    </Form.Group>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="eDM">
                        <Form.Label>End Metre</Form.Label>
                        <Form.Control
                            type="text"
                            value={foreCourt.endMetre.toString() || ''}
                            onChange={handleEndMetreChange(idx)}
                            onKeyUp={getQuantitySold(idx)}
                        />
                    </Form.Group>
                    <Form.Group className="col-lg-2 col-sm-2" controlId="qTS">
                        <Form.Label>Litres Sold</Form.Label>
                        <Form.Control
                            type="text"
                            value={foreCourt.quantitySold.toString() || ''}
                            readOnly
                            onClick={getTotalAmount(idx)}
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

WetSalesForm.propTypes = {
    handleSubmit: PropTypes.any,
    products: PropTypes.any,
};

export default WetSalesForm;
