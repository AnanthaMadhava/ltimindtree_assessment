import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const InputField = ({
    label,
    className,
    type,
    varient,
    placeholder,
    name,
    size,
    disabled,
    multiline,
    onChange,
    value,
    errors,
    passwordControl,
    showPassword
}) => {

    let icon = null;
    if(name === 'password' || name === 'confirmPassword') {
        icon = (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={passwordControl}
                    onMouseDown={text => (text)}
                    size="small"
                >
                {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                </IconButton>
            </InputAdornment>
        )
    }

    const errorText = <p>{errors}</p>

    return (
        <TextField 
            label={label}
            className={className}
            type={type || 'text'}
            variant={varient || 'outlined'}
            placeholder={placeholder}
            id={name}
            size={size || "small"}
            name={name}
            disabled={disabled || false}
            multiline={multiline}
            onChange={onChange}
            value={value}
            error={errors ? true : false}
            helperText={errors ? errorText : null}
            InputProps={{
                endAdornment: icon,
            }}
        />
    );
};

export default InputField;