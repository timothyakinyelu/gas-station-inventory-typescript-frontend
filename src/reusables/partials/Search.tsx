import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

interface SearchProps {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ handleSearch }): JSX.Element => {
    return (
        <div className="container search-wrapper">
            <Form className="search">
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                        type="text"
                        placeholder="Search by product code or date"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            handleSearch(e);
                        }}
                    />
                </Form.Group>
            </Form>
        </div>
    );
};

Search.propTypes = {
    handleSearch: PropTypes.any,
};

export default Search;
