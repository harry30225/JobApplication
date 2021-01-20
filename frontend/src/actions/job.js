import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_JOBS,
    JOB_ERROR,
    CLEAR_JOBS,
    SEARCH_JOBS,
    SORT_JOBS,
    FILTER_JOBS,
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

// clear jobs
export const clearJobs = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_JOBS
        });
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// search based on job title
export const searchTitle = (search) => async dispatch => {
    try {
        //dispatch(getJobs());
        const res = await axios.get('/api/job');
        dispatch({
            type: SEARCH_JOBS,
            payload: { jobs: res.data, search }
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// sort jobs
export const sortJobs = (sort) => async dispatch => {
    const sortArray = sort.split(' ');

    try {
        dispatch({
            type: SORT_JOBS,
            payload: { att: sortArray[0], n: parseInt(sortArray[1]) }
        })
    } catch (err) {
        // console.log(err);
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// filter jobs
export const filterJobs = (formData) => async dispatch => {
    const { typeofjob, usalary, lsalary, duration } = formData;
    try {
        dispatch({
            type: FILTER_JOBS,
            payload: { typeofjob, usalary, lsalary, duration }
        });
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}