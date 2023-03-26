import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Checkbox } from '@mui/material';
import { Edit as EditIcon, Check as CheckIcon } from '@mui/icons-material';
import InputField from '../utils/InputField';
import { getEvents, updateEvent, getFilteredEvent } from '../../hook/slice/authSlice';

const EventList = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.auth.user);
    const eventList = useSelector(state => state.auth.events);
    const [ editableData, setEditableData ] = useState({});
    const [ filter, setFilter ] = useState(false);
    
    const editRow = (data) => setEditableData(data);

    useEffect(() => {
        dispatch(getEvents(userInfo.id));
    }, []);
    
    const handelChange = e => {
        const { name, value } = e.target;
        setEditableData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateRow = () => {
        dispatch(updateEvent(editableData));
        setEditableData({});
    }

    const filterPremium = () => {
        setFilter(!filter);
        dispatch(getFilteredEvent({ filter: !filter, userId: userInfo.id }));
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Event Name</TableCell>
                        <TableCell>Event Date</TableCell>
                        <TableCell>Event Description</TableCell>
                        <TableCell>Event Price</TableCell>
                        <TableCell style={{ display: 'flex', alignItems: 'center' }}><Checkbox onClick={() => filterPremium()} checked={filter} /> Premium</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {eventList?.map(list => (
                        <TableRow>
                            {Object.keys(editableData).length >= 1 && editableData.id === list.id ?
                                <>
                                    <TableCell>{list.id}</TableCell>
                                    <TableCell>
                                        <InputField 
                                            type="text" 
                                            name="eventName" 
                                            value={editableData.eventName} 
                                            onChange={handelChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <InputField 
                                            type="date" 
                                            name="eventDate" 
                                            value={editableData.eventDate} 
                                            onChange={handelChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <InputField 
                                            type="text" 
                                            name="eventDescription" 
                                            value={editableData.eventDescription} 
                                            onChange={handelChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <InputField 
                                            type="text" 
                                            name="eventPrice" 
                                            value={editableData.eventPrice} 
                                            onChange={handelChange}
                                        />
                                    </TableCell>
                                    <TableCell>{list.premium ? 'Yes' : 'Now'}</TableCell>
                                    <TableCell><CheckIcon onClick={() => updateRow()}  /></TableCell>
                                </>
                            :
                                <>
                                    <TableCell>{list.id}</TableCell>
                                    <TableCell>{list.eventName}</TableCell>
                                    <TableCell>{list.eventDate}</TableCell>
                                    <TableCell>{list.eventDescription}</TableCell>
                                    <TableCell>{list.eventPrice}</TableCell>
                                    <TableCell>{list.premium ? 'Yes' : 'Now'}</TableCell>
                                    <TableCell><EditIcon onClick={() => editRow(list)}  /></TableCell>
                                </>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default EventList;