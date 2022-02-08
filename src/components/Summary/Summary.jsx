import React, { useEffect, useState } from 'react';

import { useStudyAnswers } from '../../hooks';

import { fetch, logout } from '../Auth/AuthHelperMethods';

import { Form, Input, Label, FormGroup } from 'reactstrap';
import { confirm } from 'react-confirm-box';

import './Summary.css';

const Summary = (props) => {
	const [getStudyAnswers, setStudyAnswers] = useStudyAnswers();
	const [maxTaskId, setMaxTaskId] = useState(0);

	useEffect(() => {
		setMaxTaskId(Math.max(...Object.keys(props.questions)));
		let root = document.getElementById('root');
		root.style.overflow = 'auto';
	}, []);

	const onAnswerChange = (e) => {
		const taskId = e.target.id.match(/\d+/)[0];
		console.log(e.target.value);
		setStudyAnswers(taskId, e.target.value);
	};

	const onBackButtonClick = (e) => {
		const taskId = e.target.id.match(/\d+/)[0];

		window.location.href = `/master-study-system/task/${taskId}`;
	};

	const onFinishClick = async (e) => {
		const result = await confirm(
			'Are you sure you want to finish the study and sumbit your answers?'
		);
		if (result) {
			const data = {
				answers: Object.entries(
					getStudyAnswers([
						...[...Array(maxTaskId).keys()].map((i) => i + 1),
					])
				).map((a) => {
					return { [a[0]]: a[1] };
				}),
			};

			await fetch('POST', '/study', data)
				.then(async (res) => {
					if (res.status === 200) {
						await logout().then(() => {
							window.location.href =
								'/master-study-system/thanks';
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		return;
	};

	const generateSummraries = () => {
		let summaries = [];

		for (let key of Object.keys(props.questions)) {
			const question = props.questions[key];

			const answer = getStudyAnswers(parseInt(key));

			summaries.push(
				<div key={parseInt(key)} style={{}}>
					<div className="summaryHeadings">
						<h2 style={{}}>
							Task {key} ({question.taskType}){' '}
						</h2>
						<button
							className="goBackButton"
							id={'goBackButton' + key}
							onClick={onBackButtonClick}>
							Go back to task
						</button>
					</div>
					<Form>
						<FormGroup>
							<Label for="question">
								<b>{question.question || 'Unknown Question'}</b>{' '}
							</Label>
							<Input
								type="textarea"
								name="question"
								id={'answer' + key}
								defaultValue={answer}
								placeholder="Enter your answer here"
								onChange={onAnswerChange}
							/>
						</FormGroup>
					</Form>
				</div>
			);
		}
		return summaries;
	};

	return (
		<div className="summaryContainer">
			<h1>Summary</h1>
			<div className="summaries">{generateSummraries()}</div>
			<div className="finishButtonContainer">
				<button className="finishButton" onClick={onFinishClick}>
					Save and finish
				</button>
			</div>
		</div>
	);
};

export default Summary;
