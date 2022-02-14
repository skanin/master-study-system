import { React } from 'react';

import CustomRouter from './CustomRouter';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	const startOfSession = window.sessionStorage.getItem('startOfSession');
	if (!startOfSession) {
		window.sessionStorage.setItem(
			'startOfSession',
			JSON.stringify(new Date().getTime())
		);
	}

	return (
		<Router>
			<CustomRouter />
		</Router>
	);
}

export default App;
