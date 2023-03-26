import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    usersList: [],
    registerError: '',
    loginError: '',
    eventsList: [],
    events: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        register: (state, action) => {
            const findEmail = state.usersList.find(list => list.email === action.payload.values.email)
            if(!findEmail) {
                state.registerError = '';
                state.usersList = [...state.usersList, { id: state.usersList.length + 1, ...action.payload.values }]
                action.payload.navigate('/login');
            } else {
                state.registerError = 'Email already exist';
            }
        },
        login: (state, action) => {
            const getUser = state.usersList.find(list => list.email === action.payload.values.email && list.password === action.payload.values.password)
            if(getUser) {
                state.loginError = '';
                localStorage.setItem('token', new Date().getTime());
                state.user = getUser;
                action.payload.navigate('/');
            } else {
                state.loginError = 'Incorrect Email or Password'
            }
        },
        createEvent: (state, action) => {
            state.eventsList = [ ...state.eventsList, action.payload.result ];
            action.payload.navigate('/event-list');
        },
        getEvents: (state, action) => {
            const getEvents = state.eventsList.filter(list => list.userId === action.payload);
            state.events = getEvents;
        },
        updateEvent: (state, action) => {
            const updateAllEvents = state.eventsList.map(list => {
                if(list.userId === action.payload.userId && list.id === action.payload.id) {
                    return action.payload;
                } else {
                    return list
                }
            })
            const updateEvents = state.events.map(list => {
                if(list.userId === action.payload.userId && list.id === action.payload.id) {
                    return action.payload;
                } else {
                    return list
                }
            })
            state.eventsList = updateAllEvents;
            state.events = updateEvents
        },
        getFilteredEvent: (state, action) => {
            const getFilteredEvents = state.eventsList.filter(list => list.userId === action.payload.userId && list.premium === action.payload.filter);
            state.events = getFilteredEvents;
        }
    }
})

export const { register, login, createEvent, getEvents, updateEvent, getFilteredEvent } = authSlice.actions;

export default authSlice.reducer;