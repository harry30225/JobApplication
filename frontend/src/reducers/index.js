import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import rprofile from './rprofile';
import aprofile from './aprofile';

export default combineReducers({
    alert,
    auth,
    rprofile,
    aprofile
});