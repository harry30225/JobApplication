import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_JOBS,
    JOB_ERROR,
} from './types';

// get all jobs
export const getJobs = () => async dispatch => {
    try {
        const res = await axios.get('/api/job');
        dispatch({
            type: GET_JOBS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};

// add a job
export const addJob = (formData, history) => async dispatch => {
    const config = {
        'headers': {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.post('/api/job', formData, config);
        dispatch({
            type: GET_JOBS,
            payload: res.data
        });
        dispatch(setAlert("Job Added", "success"));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};