import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import InputField from '../utils/InputField';
import Button from '../utils/Button';
import { login } from '../../hook/slice/authSlice';

const Login = () => {

    const loginError = useSelector(state => state.auth.loginError);
    const [showPassword, setShowPassword] = useState(false);
    const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: object({
            email: string()
                .email()
                .required('Username / Email is required field'),
            password: string()
                .matches(passwordRules, 'contain minimum 8 characters with at least 1 Uppercase and 1 special character')
                .required('Password is required field')
        }),
        onSubmit: (values) => {
            dispatch(login({ values, navigate }));
        }
    });

    return (
        <div className='reg_login_container'>
            <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                <div className='reg_login'>
                    <div className='heading'>
                        <h5>Login</h5>
                    </div>
                    <InputField 
                        label='Email'
                        type="text"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        errors={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    />
                    <InputField 
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        passwordControl={() => setShowPassword(!showPassword)}
                        showPassword={showPassword}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        errors={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                    />
                    <Button 
                        type="submit"
                        name="Login"
                    />
                    {loginError && <p>{loginError}</p>}
                    <div className='reg_log_link'>
                        New User <Link to="/register">Register</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;