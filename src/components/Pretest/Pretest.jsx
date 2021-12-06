import React from 'react'
import { useParams } from "react-router-dom";

import PretestCode from './PretestCode';

import './Pretest.css'
import PretestQuestions from './PretestQuestions';

function Pretest() {
    const { pretestId } = useParams()

    return (
        <div className='main'>
            <PretestCode />
            <PretestQuestions className='right' pretestId={pretestId}/>
        </div>
    )
}

export default Pretest;