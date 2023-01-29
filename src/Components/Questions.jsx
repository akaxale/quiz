import React, {useState, useEffect} from "react"

export default function Questions(props) {
    function AnswerItem({a}) {
        const [id, setId] = useState('')
        const key = Math.random()
        const answerObj = [{
            answer: a,
            id: {key}
        }]

        function selectAns() {
            if (!props.checked) {
                const x = answerObj.filter(obj => obj.id !== key)
                for (let i = 0; i < x.length; i++) {
                    props.clickedAnswer(props.index, x[i].answer)
                }
            }
        }
        
        useEffect(() => {
            if (props.checked) {
                for (let i = 0; i < answerObj.length; i++) {
                    if (answerObj[i].answer === props.correctAnswer) {
                        setId('correct')
                    } else if (props.selected === answerObj[i].answer) {
                        setId('incorrect')
                    } else {
                        setId('not-selected')
                    }
                }
            }
        }, [props.checked])
        
        return (
            <button
                key={key}
                id = {id}
                className={props.selected === a ? 'answer-btn selected' : 'answer-btn'}
                onClick={selectAns}
            >{answerObj[0].answer}</button>
        )
    }
    
    const eachAnswer = props.answers.map(a => {
       return <AnswerItem key={Math.random()} a={a} />
    })
    
    return (
        <div className='question-element'>
            <div className='question'>
                {props.question}
            </div>
            <div className='answers'>
                {eachAnswer}
            </div>
        </div>
    )
}