import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Layout = ({ children }) => {

    const userInfo = useSelector(state => state.auth.user);
    return (
        <Box>
            {Object.keys(userInfo).length >= 1 && localStorage.token && <Header />}
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Typography component="div">
                    { children }
                </Typography>
            </Box>
        </Box>
    );
};

export default Layout;