import React from "react"

export default function Start(props) {
    return (
        <div className='start-screen'>
            <h1>Quizzical</h1>
            <button 
                className='start-btn'
                onClick={props.startQuiz}
            >Start</button>
        </div>
    )
}