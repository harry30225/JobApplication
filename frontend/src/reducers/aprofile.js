import {
    GET_APROFILE,
    APROFILE_ERROR,
    CLEAR_APROFILE
} from '../actions/types';

const initialState = {
    aprofile: null,
    errors: {},
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {

        case GET_APROFILE:
            return {
                ...state,
                aprofile: payload,
                loading: false
            };

        case CLEAR_APROFILE:
            return {
                ...state,
                aprofile: null,
                loading: false
            };

        case APROFILE_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            }

        default:
            return state;
    }
}