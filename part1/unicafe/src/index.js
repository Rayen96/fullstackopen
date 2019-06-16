import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistic = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = ({good, neutral, bad}) => { 
    const sum = good + neutral + bad 
    const average = (good - bad) / sum
    const positive = (good) / sum * 100
    if (sum === 0) {
        return (
            <div>No feedback given</div>
        )
    }
    return (
    <table>
        <tbody>
        <Statistic text = 'good' value={good}/>
        <Statistic text = 'neutral' value={neutral}/>
        <Statistic text = 'bad' value={bad}/>
        <Statistic text = 'all' value={sum}/>
        <Statistic text = 'average' value={average}/>
        <Statistic text = 'positive' value={`${positive} %`} />
        </tbody>
    </table>
)}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = (newValue) => () => setGood(good+1)
    const handleNeutral = (newValue) => () => setNeutral(neutral+1)
    const handleBad = (newValue) => () => setBad(bad+1)


    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick = {handleGood()} text = 'good' />
            <Button handleClick = {handleNeutral()} text = 'neutral' />
            <Button handleClick = {handleBad()} text = 'bad' />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)