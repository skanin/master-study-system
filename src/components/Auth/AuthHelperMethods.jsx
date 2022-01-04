import { React, useSubject } from "../../hooks";

const axios = require("axios");
const domain = 'http://localhost:3001';

const subject = window.sessionStorage.getItem('subject') || {subject: -1, helpType: -1, username: ""};

const setSubject = (newSubject) => {
    window.sessionStorage.setItem('subject', JSON.stringify({...subject, ...newSubject}));
}


const isAuthenticated = () => {
    return fetch('post', `/auth/isAuthenticated`, subject);
}

const fetch = (method, url, data) => {
    return axios({
        method: method,
        url: domain + url,
        data: method === 'post' ? {...subject, ...data} : null,
        params: method === 'get' ? {...subject, ...data} : null
    });
    // return axios.get(domain + url, 
    //     {
    //         params: {
    //             'test': 'test',
    //         }
    //     });
}

export {isAuthenticated, fetch};