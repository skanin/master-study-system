import React from 'react';

import { useSubject } from '../../hooks/useSubject';

const InformationPage = () => {
	const [subject] = useSubject();

	console.log(subject);

	const startStudy = () => {
		window.location.href = '/master-study-system/study/task/1';
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
				<p>You will now be faced with X Java code snippets.</p>
				<br />
				<p>
					Your task is to either debug or comprehend the given code.
					The problems will be labeled whether it is a debugging or
					comprehension task.
				</p>
				<br />
				<p>
					There are no time limit. Answer each question the best you
					can.
				</p>
				<h2>Help during the tasks</h2>
				{generateHelpText()}
			</div>
			<button className="startButton" onClick={() => startStudy()}>
				Start test
			</button>
		</div>
	);
};

export default InformationPage;
