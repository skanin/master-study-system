import { React, useEffect, useState, useRef } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useSubject } from '../../hooks';

import { isAuthenticated } from '../Auth/AuthHelperMethods';

function PrivateRoute({ children }) {
	const [subject] = useSubject();
	const [isBusy, setBusy] = useState(true);
	const [access, setAccess] = useState(false);

	const checkAccess = async () => {
		await isAuthenticated(subject)
			.then((res) => {
				setAccess(res.data);
			})
			.catch((err) => {
				console.log(err);
				setAccess(false);
			});
		setBusy(false);
	};

	useEffect(() => {
		checkAccess();
	}, []);

	return access ? (
		children
	) : isBusy ? (
		<span></span>
	) : (
		<Navigate to={{ pathname: '/master-study-system/login' }} />
	);
}

export { PrivateRoute };
