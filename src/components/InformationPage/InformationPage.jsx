import React from 'react';

import { useSubject, useLogger } from '../../hooks';

const InformationPage = () => {
	const [subject] = useSubject();
	const [setLogs] = useLogger();

	const startStudy = () => {
		setLogs('startStudy');
		window.location.href =
			subject.helpType % 2 == 0
				? '/master-study-system/task/1'
				: '/master-study-system/task/2';
	};

	const generateHelpText = () => {
		let text = '';

		switch (subject.helpType) {
			case 0:
				text = `You will not get any help during the tasks.`;
				break;
			case 1:
				text = `During the tasks, you will be able to see an expert programmer's eye gaze beside your code snippets. Please use this as help just the way you like.`;
				break;
			case 2:
				text = `During the tasks, you will have the opportunity to get help in the form of an expert's eye gaze. The help can be enabled by pressing the "Get help" button. "Hide help" hides the eye gaze.`;
				break;
			case 3:
				text = `Some of the tasks you are about to face will have help in the form of an expert's eye gaze.`;
				break;
			default:
				text = `Unknown help`;
		}
		return <p>{text}</p>;
	};

	return (
		<div className="container">
			<h1>Info about the tasks</h1>
			<div className="informationText">
				<p>You will now be faced with 6 Java code snippets.</p>
				<br />
				<p>
					Your task is to either debug or comprehend the given code.
					The problems will be labeled whether it is a debugging or
					comprehension task.
				</p>
				<br />
				<p>Assume all necessary libraries are already imported.</p>
				<br />
				<p>
					There are no time limit. Answer each question the best you
					can.
				</p>
				{subject.helpType !== 4 && <h2>Help during the tasks</h2>}
				{subject.helpType !== 4 && generateHelpText()}
			</div>

			<button className="startButton" onClick={() => startStudy()}>
				Start study
			</button>
		</div>
	);
};

export default InformationPage;
