import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Question = (props) => {

    const generateAnswers = () => {
        console.log(props.checked);
        return props.answers.map((answer, index) => (
                <FormGroup key={index} check>
                    <Input name={'radio' + props.id} type="radio" id={index} defaultChecked = {index == props.checked}/>
                    {' '}
                    <Label check>
                        {answer}
                    </Label>
                </FormGroup>
            )
        )
    }

    return (
        <div className="question" id={"question" + props.id}>
            <FormGroup tag="fieldset" onChange={(e) => {props.onQuestionChange(e)}}>
                <legend style={{fontSize: "medium", fontWeight: "bold"}}>{props.question}</legend>
                {generateAnswers()}
            </FormGroup>
        </div>
    );
}

export default Question;