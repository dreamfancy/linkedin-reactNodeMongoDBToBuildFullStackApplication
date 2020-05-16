import React from 'react';
import PropTypes from 'prop-types';

const Header = ({message}) => {
    return (
        <h2 className='text-center'>
            {message}
        </h2>
    );
};

Header.propTypes = {
    message: PropTypes.string
};

Header.defaultProps = {
   message: "default contest"
};

export default Header;