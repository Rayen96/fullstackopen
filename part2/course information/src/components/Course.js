import React from 'react'

const Header = props =>
    <h1>{props.course}</h1>

const Total = props =>{
    const total = props.parts.reduce((x,y) => ({exercises: x.exercises+y.exercises}))
    return (<b>total of {total.exercises} exercises</b>)
}

const Part = props => {
    return(
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Content = props => {
    const rows = () => props.parts.map(part =>
        <Part part={part} key={part.id}/>
    )
    return (
        <div>{rows()}</div>
    )
}

const Course = props => {
    return (
    <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </div>
    )
}

export default Course