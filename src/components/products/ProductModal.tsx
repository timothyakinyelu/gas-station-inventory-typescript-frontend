import React from 'react';
import PropTypes from 'prop-types';

interface ProductModalProps {
    show?: boolean;
}

const ProductModal: React.FC<ProductModalProps> = (): JSX.Element => {
    return <h4>Product Modal</h4>;
};

ProductModal.propTypes = {
    show: PropTypes.bool,
};

export default ProductModal;
