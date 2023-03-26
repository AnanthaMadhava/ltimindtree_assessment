import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from './utils/Button';

const Home = () => {
    const userInfo = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    return (
        <div className='text-center'>
            <h1>Welcome {userInfo.userName}</h1>
            <Button 
                name="Create Event ->"
                onClick={() => navigate('/create-event')}
            />
        </div>
    );
};

export default Home;