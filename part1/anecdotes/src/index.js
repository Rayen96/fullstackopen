import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const temp = Array(Math.floor(anecdotes.length)).fill(0)
  const [points, setPoints] = useState(temp)
  const handleClick = (newNumber) => () => {
        setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)))
  }

  const vote = () => () => {
      const copy = [...points]
      copy[selected] += 1
      setPoints(copy)
  }

  const arrayMaxIndex = () =>
    points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <div>
        <Button handleClick={vote()} text = 'vote'/>
        <Button handleClick={handleClick()} text = 'next anecdote'/>
      </div>
      <h1>Anecdote with most votes</h1>
        <div>{props.anecdotes[arrayMaxIndex()]}</div>
        <div>has {points[arrayMaxIndex()]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)