import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../Auth/AuthHelperMethods';
import { useLogger } from '../../hooks';

import './Home.css';

function Home() {
	const navigate = useNavigate();
	const [setLogs] = useLogger();

	useEffect(() => {
		isAuthenticated();
	});

	const startPretest = () => {
		setLogs('startPretest');
		navigate('/master-study-system/pretest/1');
	};

	return (
		<div className="container">
			<h1>Information</h1>
			<div className="informationText">
				<p>
					You will now be faced with 10 tasks. These tasks are meant
					for detemining your level of programming expertise. There
					will be no possibility to compile the code snippets
				</p>
				<br />
				<p>
					The questions will be in a multiple choice format. When you
					are finished answering the questions, press “submit and next
					problem” to get to the next problem
				</p>
			</div>
			<button className="startButton" onClick={() => startPretest()}>
				Start pretest
			</button>
		</div>
	);
}

export default Home;
