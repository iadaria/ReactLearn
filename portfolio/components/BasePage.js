import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

const BasePage = ({children, className}) => {
    //const [className] = useState('');

    return (
        <div className={`base-page ${className}`}>
            <Container>
                {children}
            </Container>
        </div>
    );
};

BasePage.defaultProps = {
    className: ''
};

BasePage.propTypes = {
    className: PropTypes.string.isRequired
};

export default BasePage;