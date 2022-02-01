import { React } from 'react';

import CustomRouter from './CustomRouter';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<Router>
			<CustomRouter />
		</Router>
	);
}

export default App;
