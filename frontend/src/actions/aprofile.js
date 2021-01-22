import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_APROFILE,
    APROFILE_ERROR,
    CLEAR_APROFILE
} from './types';

// get current recruiter profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/aprofile/me');
        dispatch({
            type: GET_APROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: APROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// update recruiter profile
export const createProfile = (formData, history) => async dispatch => {
    const config = {
        'headers': {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.post('/api/aprofile/skills', formData, config);
        dispatch({
            type: GET_APROFILE,
            payload: res.data
        });
        dispatch(setAlert("Skills Added", "success"));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: APROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add education
export const addEducation = (formData, history) => async dispatch => {
    const config = {
        'headers': {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.put('/api/aprofile/education', formData, config);
        dispatch({
            type: GET_APROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education Added", "success"));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: APROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// clear profile 
export const clearAprofile = () => async dispatch => {
    try {
        dispatch({ type: CLEAR_APROFILE });
    } catch (err) {
        dispatch({
            type: APROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};

// add myapplication
export const addMyapplication = (id) => async dispatch => {
    const config = {
        'headers': {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({ id });
    try {
        const res = await axios.put('/api/aprofile/application', body, config);
        dispatch({
            type: GET_APROFILE,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: APROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
