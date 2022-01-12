import { combineReducers } from 'redux';

import subjectReducer from './subjectReducer';

const allReducers = combineReducers({
	subject: subjectReducer,
});

export default allReducers;
