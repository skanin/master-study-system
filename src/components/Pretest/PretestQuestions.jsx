import React, { useEffect } from 'react';

import { usePretestAnswers } from '../../hooks';

import {Form} from 'reactstrap';
import questions from './questions.json';
import Question from './Question';

function PretestQuestions(props) {

    const pretestId = props.pretestId;

    const [getPretestAnswers, setPretestAnswers] = usePretestAnswers();
    const [origQuestions, setOrigQuestions] = React.useState(getPretestAnswers(pretestId) || questions);
    const [currQuestions, setCurrQuestions] = React.useState([]);
    const [showNextButton, setShowNextButton] = React.useState(false);
    const [showPrevButton, setShowPrevButton] = React.useState(false);
    const [buttonClicked, setButtonClicked] = React.useState(-1);
    const [maxPretestId, setMaxPretestId] = React.useState(-1);


    useEffect(() => {
        generateQuestions();
        setMaxPretestId(Math.max(...Object.keys(origQuestions)));
    }, [])

    const generateQuestions = (nextButton = true) => {
        if(!origQuestions.hasOwnProperty(pretestId)) {
            setCurrQuestions(undefined);
            return;
        }

        let questionsTemp = origQuestions[pretestId].questions;
        let tmpButtonClicked = buttonClicked + (nextButton ? 1 : -1);
        

        setShowNextButton(questionsTemp.length > tmpButtonClicked*3 + 3)
        setShowPrevButton(tmpButtonClicked*3 >= 3)
        setButtonClicked(tmpButtonClicked)
        setCurrQuestions([...questionsTemp.slice(tmpButtonClicked*3, tmpButtonClicked*3+3)]);
    }

    const onQuestionChange = (e) => {
        origQuestions[pretestId].questions.forEach(element => {
            if(element.questionId == [e.target.name][0].slice([e.target.name][0].indexOf('radio') + 5)){
                element.checked = e.target.id
            }
        })
        setOrigQuestions(origQuestions);
        setPretestAnswers(pretestId, origQuestions);
    }


    const nextPretestTask = () => {
        setPretestAnswers(pretestId, origQuestions);

        if(parseInt(pretestId) < parseInt(maxPretestId)) {
            window.location.href = `/master-study-system/pretest/${parseInt(pretestId)+1}`;
        } else {
            window.location.href = '/master-study-system/info';
        }
    }

    return(
        <div className={props.className}>
            {currQuestions !== undefined ?
             <Form className="questionsForm">
                {currQuestions.map((question) => (<Question key={question.questionId} id={question.questionId} question={question.question} answers={question.answers} correct={question.correct} onQuestionChange={onQuestionChange} checked = {question.checked}/>))}
            </Form> : 
            <h1>There are no questions for this pretest task</h1>}
            <div className="buttons">
                {!showPrevButton && showNextButton && <div></div>}
                {showPrevButton && <button id='prevButton' onClick={() => {generateQuestions(false)}}>Prev</button>}
                {!showNextButton && maxPretestId == pretestId && <button id='submitButton' onClick={() => nextPretestTask()}>Submit</button>}
                {!showNextButton && maxPretestId > pretestId && <button id='nextPretestTaskButton' onClick={() => nextPretestTask()}>Submit and next</button>}
                {showNextButton && <button id='nextButton' onClick={() => {generateQuestions()}}>Next</button>}
            </div>
        </div>
    )
}

export default PretestQuestions;