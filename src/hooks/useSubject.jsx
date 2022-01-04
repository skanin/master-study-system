import {useState} from 'react';

export const useSubject = () => {
    const session = window.sessionStorage.getItem('subject') || JSON.stringify({subject: -1, helpType: -1, username: ""});

    const [subjectState, setSubjectState] = useState(JSON.parse(session));

    const setSubject = (newSubject) => {
        window.sessionStorage.setItem('subject', JSON.stringify({...subjectState, ...newSubject}));
        setSubjectState({...subjectState, ...newSubject});
    }

    const subject = subjectState;

    return [subject, setSubject];
}