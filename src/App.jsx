import React, {useState, useEffect} from "react"
import Start from "./Components/Start"
import Questions from "./Components/Questions"

//'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple'

export default function App() {
    
    const [quesObjects, setQuesObjects] = useState([])
    const [start, setStart] = useState(true)
    const [rendered, setRendered] = useState(false)
    const [checked, setChecked] = useState(false)
    const [counter, setCounter] = useState(0)
    
    function startQuiz() {
        setStart(false)
    }
    
    const answersRandomizer = (arr) => arr.sort(() => Math.random() - 0.5)
    
    useEffect(() => {
        async function getQuestion() {
            const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            const data = await res.json()
            const qArr = []
            data.results.map(object => {
                qArr.push({
                    id: Math.random(), 
                    question: object.question, 
                    answers: answersRandomizer([...object.incorrect_answers,object.correct_answer]),
                    correct: object.correct_answer, 
                    incorrect: object.incorrect_answers,
                    selected: null, 
                    checked: false
                })
                return qArr;
            })
            setQuesObjects(qArr)
            setRendered(true)
        }
         !checked && getQuestion()
    }, [checked])    
    
    function clickedAnswer(id, answer) {
        setQuesObjects(
            quesObjects.map(qObject => {
                return qObject.id === id ? {...qObject, selected: answer} : qObject
            })
        )
    }    
    
    function checkAnswer() {
        const arr = quesObjects.map(q => q.selected)
        if (arr.every(elem => elem)) {
            setQuesObjects(
                quesObjects.map(q => ({
                    ...q,
                    checked: true
                }))
            )
            setChecked(true)
            quesObjects.map(q => {
                if (q.correct === q.selected) {
                    setCounter(prev => prev + 1)
                }
                return counter
            })
        }
    }
    
    function playAgain() {
        setQuesObjects(
            quesObjects.map(q => ({
                ...q,
                checked: false
            }))
        )
        setChecked(false)
        setCounter(0)
        setRendered(false)        
    }
    
    const questions = quesObjects.map(qObject => (
        <Questions
            key={qObject.id}
            index={qObject.id}
            question={qObject.question}
            answers={qObject.answers}
            correctAnswer={qObject.correct}
            checked={qObject.checked}
            selected={qObject.selected}
            clickedAnswer={clickedAnswer}
        />
    ))
    
    return (
        <div className='container'>
            {
                start ?
                    <Start 
                        startQuiz={startQuiz}
                    /> :
                    <div>
                        <div className='is-rendering'>
                            {!rendered && <p className='wait'>Please Wait...</p>}
                        </div>
                        {
                            rendered &&
                            <div>
                                {questions}
                                    <div className='check'>
                                        <button 
                                            className={!checked ? 'check-btn btn' : 'play-again-btn btn'}
                                            onClick={!checked ? checkAnswer : playAgain}
                                        >
                                            {!checked ? 'Check Answers' : 'Play Again'}
                                        </button>
                                        {checked && <p className='score'>You scored {counter}/5 correct answers</p>}
                                    </div>
                            </div>
                        }
                    </div>
            }

            <div className='blob fst'>
            </div>
            <div className='blob scnd'>
            </div>
            
        </div>
    )
}