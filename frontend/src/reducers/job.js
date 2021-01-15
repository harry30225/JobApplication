import {
    GET_JOBS,
    JOB_ERROR,
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