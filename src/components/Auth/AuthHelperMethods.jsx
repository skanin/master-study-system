const axios = require('axios');

const domain = 'http://localhost:3001'; // `http://192.168.0.51:3001`;

const isAuthenticated = (subject) => {
	return fetch('post', `/auth/isAuthenticated`, subject);
};

const fetch = (method, url, data = {}) => {
	const subject = JSON.parse(window.sessionStorage.getItem('subject')) || {
		subject: -1,
		helpType: -1,
		username: '',
	};

	return axios({
		method: method,
		url: domain + url,
		data: method.toLowerCase() === 'post' ? { ...subject, ...data } : null,
		params: method.toLowerCase() === 'get' ? { ...subject, ...data } : null,
	});
};

const logout = () => {
	return new Promise((resolve, reject) => {
		window.sessionStorage.clear();
		resolve();
	});
};

export { isAuthenticated, fetch, logout };
