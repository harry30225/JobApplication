import {
    GET_APROFILE,
    GET_APROFILES,
    SORT_APROFILES,
    APROFILE_ERROR,
    CLEAR_APROFILE
} from '../actions/types';

const initialState = {
    aprofile: null,
    aprofiles: [],
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
                aprofiles: [],
                loading: false
            };

        case GET_APROFILES:
            return {
                ...state,
                aprofiles: payload,
                loading: false
            };

        case SORT_APROFILES:
            return {
                ...state,
                aprofiles: state.aprofiles.sort(function (a, b) {
                    if (payload.att === "name") {
                        return (payload.n) * (parseInt(a.user.name) - parseInt(b.user.name))
                    }
                    if (payload.att === "date") {
                        const datea = a.applications.filter(app => app.job === payload.jobId).dateofapplication;
                        const dateb = b.applications.filter(app => app.job === payload.jobId).dateofapplication;

                        return (payload.n) * (datea - dateb)
                    }
                    if (payload.att === "rating") {
                        return (payload.n) * (parseInt(a.rating) - parseInt(b.rating))
                    }

                }),
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