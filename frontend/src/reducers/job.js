import {
    GET_JOBS,
    JOB_ERROR,
    CLEAR_JOBS,
    SEARCH_JOBS,
} from '../actions/types';

const initialState = {
    jobs: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_JOBS:
            return {
                ...state,
                jobs: payload,
                loading: false
            };

        case CLEAR_JOBS:
            return {
                ...state,
                jobs: [],
                loading: false
            };

        case SEARCH_JOBS:
            return {
                ...state,
                jobs: state.jobs.filter(job => job.title === payload),
                loading: false
            };

        case JOB_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };

        default:
            return state;
    }
};