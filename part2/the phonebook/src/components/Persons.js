import React from 'react'



const Person = ({ name, number, id,handleDelete }) => (
    <div>
        {name} {number} <button onClick={handleDelete(id)}>delete</button>
    </div>
)
const Persons = ({persons, filterString, handleDelete}) => {
    const numbersToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filterString.toLowerCase())
    )
    const rows = () => (
        numbersToShow.map(person =>
            <Person
                name={person.name}
                number={person.number}
                key={person.name}
                handleDelete={handleDelete}
                id={person.id}
            />
        )
    )

    return (<div>{rows()}</div>)

}
export default Persons