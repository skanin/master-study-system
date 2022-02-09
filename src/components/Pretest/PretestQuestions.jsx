import React from 'react';

import { usePretestAnswers, useMountEffect } from '../../hooks';
import { useParams } from 'react-router-dom';
import { fetch } from '../Auth/AuthHelperMethods';
import { Form } from 'reactstrap';
import questions from '../../data/questions_pretest.json';
import Question from './Question';

function PretestQuestions(props) {
	const { taskId } = useParams();
	const [getPretestAnswers, setPretestAnswers] = usePretestAnswers();
	const [origQuestions, setOrigQuestions] = React.useState(
		getPretestAnswers(taskId) || {
			questions: questions[taskId].questions.map((q, i) => {
				return {
					...q,
					questionId: taskId + '-' + (parseInt(i) + 1),
				};
			}),
		}
	);
	const [currQuestions, setCurrQuestions] = React.useState([]);
	const [showNextButton, setShowNextButton] = React.useState(false);
	const [showPrevButton, setShowPrevButton] = React.useState(false);
	const [buttonClicked, setButtonClicked] = React.useState(-1);
	const [maxPretestId, setMaxPretestId] = React.useState(-1);

	useMountEffect(() => {
		generateQuestions();
		setMaxPretestId(Math.max(...Object.keys(questions)));
	});

	const generateQuestions = (nextButton = true) => {
		if (!origQuestions) {
			setCurrQuestions(undefined);
			return;
		}

		let questionsTemp = origQuestions.questions;
		let tmpButtonClicked = buttonClicked + (nextButton ? 1 : -1);

		setShowNextButton(questionsTemp.length > tmpButtonClicked * 3 + 3);
		setShowPrevButton(
			tmpButtonClicked * 3 >= Math.floor(questionsTemp.length / 3) && Math.floor(questionsTemp.length / 3) !== 0
		);
		setButtonClicked(tmpButtonClicked);
		setCurrQuestions([
			...questionsTemp.slice(
				tmpButtonClicked * 3,
				tmpButtonClicked * 3 + 3
			),
		]);
	};

	const onQuestionChange = (e) => {
		origQuestions.questions.forEach((element) => {
			if (
				element.questionId ===
				[e.target.name][0].slice(
					[e.target.name][0].indexOf('radio') + 5
				)
			) {
				element.checked = parseInt(e.target.id);
			}
		});
		setOrigQuestions(origQuestions);
		setPretestAnswers(taskId, origQuestions);
	};

	const nextPretestTask = async () => {
		setPretestAnswers(taskId, origQuestions);

		if (parseInt(taskId) < maxPretestId) {
			window.location.href =
				'/master-study-system/pretest/' + (parseInt(taskId) + 1);
		} else {
			let data = { questions: [] };
			for (let i = 1; i <= maxPretestId; i++) {
				(
					getPretestAnswers(i) || {
						questions: questions[i].questions.map((q, ind) => {
							return {
								...q,
								questionId: `${i}-${ind + 1}`,
							};
						}),
					}
				).questions.forEach((question) => {
					data.questions.push(question);
				});
			}
			await fetch('post', `/pretest`, data)
				.then((res) => {
					window.location.href = '/master-study-system/info';
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className={props.className}>
			{currQuestions !== undefined ? (
				<Form className="questionsForm">
					{currQuestions.map((question, i) => (
						<Question
							key={question.questionId}
							id={question.questionId}
							question={question.question}
							answers={question.answers}
							correct={question.correct}
							onQuestionChange={onQuestionChange}
							checked={question.checked}
						/>
					))}
				</Form>
			) : (
				<h1>There are no questions for this pretest task</h1>
			)}
			<div className="buttons">
				{!showPrevButton && showNextButton && <div></div>}
				{showPrevButton && (
					<button
						id="prevButton"
						onClick={() => {
							generateQuestions(false);
						}}>
						Prev
					</button>
				)}
				{!showNextButton && maxPretestId === parseInt(taskId) && (
					<button id="submitButton" onClick={() => nextPretestTask()}>
						Submit
					</button>
				)}
				{!showNextButton && maxPretestId > taskId && (
					<button
						id="nextPretestTaskButton"
						onClick={() => nextPretestTask()}>
						Submit and next
					</button>
				)}
				{showNextButton && (
					<button
						id="nextButton"
						onClick={() => {
							generateQuestions();
						}}>
						Next
					</button>
				)}
			</div>
		</div>
	);
}

export default PretestQuestions;
