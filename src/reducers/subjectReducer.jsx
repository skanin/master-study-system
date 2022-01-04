const defaultState = {
    subject: -1,
    helpType: -1,
};

const subjectReducer = (state = defaultState, action) => {
switch(action.type) {
        case 'SET_SUBJECT':
            return {
                ...state,
                subject: action.payload.subject,
            };
        case 'SET_HELP_TYPE':
            return {
                ...state,
                helpType: action.payload.helpType,
            }
        case 'SET_SUBJECT_AND_HELP_TYPE':
            return {
                ...state,
                subject: action.payload.subject,
                helpType: action.payload.helpType,
            }
        default:
            return state;
    }
};

export default subjectReducer;