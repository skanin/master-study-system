import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const Question = (props) => {
	const generateAnswers = () => {
		return props.answers.map((answer, index) => (
			<FormGroup key={index} check>
				<Input
					name={'radio' + props.id}
					type="radio"
					id={index}
					defaultChecked={index === props.checked}
				/>{' '}
				<Label
					check
					onClick={() => {
						props.onQuestionChange({
							target: {
								name: 'radio' + props.id,
								id: index,
							},
						});
						document.getElementById(index).checked = true;
					}}>
					{answer}
				</Label>
			</FormGroup>
		));
	};

	return (
		<div className="question" id={'question' + props.id}>
			<FormGroup
				tag="fieldset"
				onChange={(e) => {
					props.onQuestionChange(e);
				}}>
				<legend style={{ fontSize: 'medium', fontWeight: 'bold' }}>
					{props.question}
				</legend>
				{generateAnswers()}
			</FormGroup>
		</div>
	);
};

export default Question;
