import { React, useEffect } from 'react';

import { Route, Navigate } from 'react-router-dom';

import { useSubject } from '../../hooks';

export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {
    const [subject] = useSubject();

    let access = false;

    useEffect(() => {
        console.log('Hey')
    }, [subject])

    return (
        <Route {...rest} render={props => {
            if (true) {
                return <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
            }

            return <Component {...props} />
        }} />
    );
}