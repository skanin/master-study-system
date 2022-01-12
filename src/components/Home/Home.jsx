import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../Auth/AuthHelperMethods';

import { useSubject } from '../../hooks/useSubject';

import './Home.css';

function Home() {
	const [setSubject] = useSubject();

	const navigate = useNavigate();

	useEffect(() => {
		isAuthenticated();
	});

	const startPretest = () => {
		navigate('/master-study-system/pretest/1');
	};

	const testSetSubject = () => {
		setSubject({ subject: 1, username: 'tacopady' });
	};

	const testSetHelpType = () => {
		setSubject({ helpType: 1 });
	};

	const testSetSubjectAndHelpType = () => {
		setSubject({ subject: 2, helpType: 2 });
	};

	return (
		<div className="container">
			<h1>Information</h1>
			<div className="informationText">
				<p>
					You will now be faced with X tasks. These tasks are meant
					for detemining your level of programming expertise.
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
			<button onClick={() => testSetSubject()}>Test set subject</button>
			<button onClick={() => testSetHelpType()}>
				Test set help type
			</button>
			<button onClick={() => testSetSubjectAndHelpType()}>
				Test set subject and help type
			</button>
		</div>
	);
}

export default Home;
