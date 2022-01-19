import { React, useState, useEffect } from 'react';

import { useStudyAnswers, useSubject } from '../../hooks';

import { Input, FormGroup, Form, Label } from 'reactstrap';

import { fetch } from '../Auth/AuthHelperMethods';

const StudyQuestion = (props) => {
	const [subject] = useSubject();
	const [answer, setAnswer] = useState('');
	const [question, setQuestion] = useState({});
	const [getStudyAnswers, setStudyAnswers] = useStudyAnswers();
	const [maxTaskId, setMaxTaskId] = useState(-1);

	useEffect(() => {
		setMaxTaskId(Math.max(...Object.keys(props.questions)));
		if (
			!props.questions.hasOwnProperty(props.taskId) &&
			!getStudyAnswers(props.taskId)
		) {
			setQuestion({});
			setAnswer('');
			return;
		} else if (
			!props.questions.hasOwnProperty(props.taskId) &&
			getStudyAnswers(props.taskId)
		) {
			setQuestion({});
			setAnswer(getStudyAnswers(props.taskId));
			return;
		} else if (
			props.questions.hasOwnProperty(props.taskId) &&
			!getStudyAnswers(props.taskId)
		) {
			setQuestion(props.questions[props.taskId]);
			setAnswer('');
			return;
		}
		setQuestion(props.questions[props.taskId]);
		setAnswer(getStudyAnswers(props.taskId));
	}, [props.questions, props.taskId]);

	const handleChange = (e) => {
		setAnswer(e.target.value);
		setStudyAnswers(props.taskId, e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStudyAnswers(props.taskId, answer);
		if (parseInt(props.taskId) === maxTaskId) {
			const data = {
				answers: Object.entries(
					getStudyAnswers([
						...[...Array(10).keys()].map((i) => i + 1),
					])
				).map((a) => {
					return { [a[0]]: a[1] };
				}),
			};

			await fetch('POST', '/study', data)
				.then((res) => {
					if (res.status === 200) {
						window.location.href = '/summary';
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			window.location.href = `/master-study-system/task/${
				parseInt(props.taskId) + 1
			}`;
		}
	};

	return (
		<div className={props.className}>
			<div id="questionDiv">
				<span>
					<b>{question.taskType || 'Unknown task type'}</b>
				</span>
				<Form>
					<FormGroup>
						<Label for="question">
							<b>{question.question || 'Unknown Question'}</b>{' '}
						</Label>
						<Input
							type="textarea"
							name="question"
							id="question"
							value={answer}
							placeholder="Enter your answer here"
							onChange={handleChange}
						/>
					</FormGroup>
				</Form>
			</div>
			<div id="buttonsDiv">
				<button>Get help</button>
				<button onClick={handleSubmit}>Submit and next</button>
			</div>
		</div>
	);
};

export default StudyQuestion;
