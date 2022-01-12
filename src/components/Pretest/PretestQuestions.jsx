import React, { useEffect } from 'react';

import { usePretestAnswers } from '../../hooks';
import { fetch } from '../Auth/AuthHelperMethods';
import { Form } from 'reactstrap';
import questions from './questions.json';
import Question from './Question';

function PretestQuestions(props) {
	const pretestId = parseInt(props.pretestId);
	console.log(questions);
	const [getPretestAnswers, setPretestAnswers] = usePretestAnswers();
	const [origQuestions, setOrigQuestions] = React.useState(
		getPretestAnswers(pretestId) || {
			questions: questions[pretestId].questions.map((q, i) => {
				return {
					...q,
					questionId: pretestId + '-' + (parseInt(i) + 1),
				};
			}),
		}
	);
	const [currQuestions, setCurrQuestions] = React.useState([]);
	const [showNextButton, setShowNextButton] = React.useState(false);
	const [showPrevButton, setShowPrevButton] = React.useState(false);
	const [buttonClicked, setButtonClicked] = React.useState(-1);
	const [maxPretestId, setMaxPretestId] = React.useState(-1);

	useEffect(() => {
		generateQuestions();
		setMaxPretestId(Math.max(...Object.keys(questions)));
	}, []);

	const generateQuestions = (nextButton = true) => {
		// if(!origQuestions.hasOwnProperty(pretestId)) {
		//     setCurrQuestions(undefined);
		//     return;
		// }
		if (!origQuestions) {
			setCurrQuestions(undefined);
			return;
		}

		let questionsTemp = origQuestions.questions;
		let tmpButtonClicked = buttonClicked + (nextButton ? 1 : -1);

		setShowNextButton(questionsTemp.length > tmpButtonClicked * 3 + 3);
		setShowPrevButton(
			tmpButtonClicked * 3 >= Math.floor(questionsTemp.length / 3)
		);
		setButtonClicked(tmpButtonClicked);
		console.log(maxPretestId, pretestId);
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
		setPretestAnswers(pretestId, origQuestions);
	};

	const nextPretestTask = async () => {
		setPretestAnswers(pretestId, origQuestions);

		if (parseInt(pretestId) < maxPretestId) {
			window.location.href =
				'/master-study-system/pretest/' + (parseInt(pretestId) + 1);
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
			alert(JSON.stringify(data));
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
				{!showNextButton && maxPretestId == pretestId && (
					<button id="submitButton" onClick={() => nextPretestTask()}>
						Submit
					</button>
				)}
				{!showNextButton && maxPretestId > pretestId && (
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
