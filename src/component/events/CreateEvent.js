import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Radio, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import { object, string, boolean } from 'yup';
import InputField from '../utils/InputField';
import Button from '../utils/Button';
import { createEvent } from '../../hook/slice/authSlice';

const CreateEvent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.auth.user);
    const eventList = useSelector(state => state.auth.events);

    const formik = useFormik({
        initialValues: {
            eventName: '',
            eventDate: '',
            eventDescription: '',
            eventPrice: '',
            premium: false,
            t_c: false
        },
        validationSchema: object({
            eventName: string()
                .required('Event Name is a required field'),
            eventDate: string()
                .required('Event Date is a required field'),
            eventDescription: string()
                .required('Event Description is a required field'),
            eventPrice: string()
                .required('Event Price is a required field'),
            t_c: boolean()
                .oneOf([true], 'Accept Tearms and conditions')
        }),
        onSubmit: (values) => {
            let result = {
                userId: userInfo.id,
                id: eventList.length + 1,
                ...values
            }
            delete result.t_c
            dispatch(createEvent({ result, navigate }));
        }
    })
    
    return (
        <div className='create-event-container'>
            <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                <div className='heading'>
                    <h5>Create Event</h5>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <InputField 
                            label='Event Name'
                            className='event_fields'
                            type="text"
                            name="eventName"
                            onChange={formik.handleChange}
                            value={formik.values.eventName}
                            errors={formik.touched.eventName && formik.errors.eventName ? formik.errors.eventName : null}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField 
                            className='event_fields'
                            type="date"
                            name="eventDate"
                            onChange={formik.handleChange}
                            value={formik.values.eventDate}
                            errors={formik.touched.eventDate && formik.errors.eventDate ? formik.errors.eventDate : null}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField 
                            label='Event Description'
                            className='event_fields'
                            type="text"
                            name="eventDescription"
                            multiline
                            onChange={formik.handleChange}
                            value={formik.values.eventDescription}
                            errors={formik.touched.eventDescription && formik.errors.eventDescription ? formik.errors.eventDescription : null}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField 
                            label='Event Price'
                            className='event_fields'
                            type="text"
                            name="eventPrice"
                            onChange={e => {
                                const regex = /^([0-9]){0,2}$/;
                                if (e.target.value === '' || regex.test(e.target.value)) {
                                    formik.setFieldValue('eventPrice', e.target.value)
                                }
                            }}
                            value={formik.values.eventPrice}
                            errors={formik.touched.eventPrice && formik.errors.eventPrice ? formik.errors.eventPrice : null}
                        />
                    </Grid>
                    <Grid item xs={12} className="premium_check">
                        <div className='p_c'>
                            <Radio 
                                name='premium'
                                onClick={() => formik.setFieldValue('premium', !formik.values.premium)}
                                checked={formik.values.premium}
                            /> 
                            Premium
                        </div>
                        <p className='errors'>{formik.touched.premium && formik.errors.premium ? formik.errors.premium : null}</p>
                    </Grid>
                    <Grid item xs={12} className="t_c_check">
                        <div className='t_c'>
                            <Checkbox 
                                color='primary'
                                name='t_c'
                                onClick={() => formik.setFieldValue('t_c', !formik.values.t_c)}
                                checked={formik.values.t_c}
                            /> 
                            I accept terms & conditions
                        </div>
                        <p className='errors'>{formik.touched.t_c && formik.errors.t_c ? formik.errors.t_c : null}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            type='submit'
                            name="Create"
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default CreateEvent;