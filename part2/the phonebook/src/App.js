import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterString, setFilterString] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationtype] = useState(0)
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
      if (persons.map(person=>person.name).includes(newName)) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person1 = persons.find(n => n.name === newName);
          const changedPerson = { ...person1, number: newNumber };
          
          personService
            .update(person1.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
              setNotification(
                `Changed ${newName}'s number`
              );
              setNotificationtype(0);
              setTimeout(() => {
                setNotification(null)
              }, 5000);
              
              setNewName('');
              setNewNumber('');
            })
            .catch(error => {
              setNotification(
                `Information of ${newName} has already been removed from server`
              );
              setNotificationtype(1);
              setTimeout(() => {
                setNotification(null)
              }, 5000);
              setNewName('');
              setNewNumber('');
              setPersons(persons.filter(n => n.name !== newName));
            });
          }
      }
      else {
        const newObject = {
          name: newName,
          number: newNumber,
        }

        personService
          .create(newObject)
          .then(returnedPerson =>{
            setPersons(persons.concat(returnedPerson));
            setNotification(
              `Added ${newName}'s number`
            );
            setNotificationtype(0);
            setTimeout(() => {
              setNotification(null)
            }, 5000);
            setNewName('');
            setNewNumber('');
          })
        /*
        setPersons(persons.concat({ name : newName,
          number : newNumber}))
        setNewName('')
        setNewNumber('')*/
      }
  }

  const handleDelete = (id) => () => {
    if (window.confirm(`Delete ${ persons.find(x => x.id === id).name }`)) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter(person=>person.id!==id)))
    }
  }
  const handleFilterStringChange = (event) => 
    setFilterString(event.target.value)

  const handleNameChange = (event) =>
    setNewName(event.target.value)

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} 
        notificationType={notificationType}
      />
      <Filter 
        filterString={filterString}
        handleFilterStringChange={handleFilterStringChange}
      />      
      <h3>add a new</h3>
      
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterString={filterString}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App