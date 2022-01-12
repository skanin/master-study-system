const axios = require('axios');
const domain = 'http://localhost:3001';

const setSubject = (newSubject) => {
	const subject = JSON.parse(window.sessionStorage.getItem('subject')) || {
		subject: -1,
		helpType: -1,
		username: '',
	};
	window.sessionStorage.setItem(
		'subject',
		JSON.stringify({ ...subject, ...newSubject })
	);
};

const isAuthenticated = (subject) => {
	return fetch('post', `/auth/isAuthenticated`, subject);
};

const fetch = (method, url, data) => {
	const subject = JSON.parse(window.sessionStorage.getItem('subject')) || {
		subject: -1,
		helpType: -1,
		username: '',
	};

	return axios({
		method: method,
		url: domain + url,
		data: method === 'post' ? { ...subject, ...data } : null,
		params: method === 'get' ? { ...subject, ...data } : null,
	});
};

export { isAuthenticated, fetch };
