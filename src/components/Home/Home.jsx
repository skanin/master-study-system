import React from 'react';
import {useNavigate} from 'react-router-dom';

import './Home.css';

function Home(){
    const navigate = useNavigate();
    const startPretest = () => {
        navigate('/pretest/1');        
    }

    return (
        <div className='container'>
            <h1>Information</h1>
            <div className='informationText'>
                <p>You will be You will now be faced with X tasks. These tasks are meant for detemining your level of programming expertise.</p>
                <br />
                <p>The questions will be in a multiple choice format. When you are finished answering the questions, press “submit and next problem” to get to the next problem</p>
            </div>
            <button className='startButton' onClick={() => startPretest()}>Start pretest</button>
        </div>
    )
}

export default Home;