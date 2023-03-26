import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({
    name, 
    type,
    variant, 
    buttonStyle, 
    onClick,
    component
}) => {
    return (
        <MuiButton type={type} variant={variant || "contained"} component={component} color="primary" className={buttonStyle} onClick={onClick}>
            {name}
        </MuiButton>
    );
};

export default Button;