import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import Add from './components/Add'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ filtered, setFiltered ] = useState([])
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
      } )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const index = names.indexOf(newName)
    if (index > -1) {
      if(window.confirm(newName + ' is allready added to phonebook, replace old number with new one?')) {
        updatePerson(persons[index])
        return
      }
    }
    const person = {
      name: newName,
      number: newNumber
    }
    personService.create(person)
      .then(response => {
        console.log(person)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setNotification({kind: 'note', content: person.name + ' was added succesfully'})
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      })
      .catch(error => {
        setNotification({kind: 'error', content: error.response.data.error})
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      })
  }

  const removePerson = (name, id) => {
    return () => {
      if(window.confirm(`Delete ${name} ?`)) {
        personService.remove(id)
          .then(response => {
            setPersons(persons.filter(person => person.id !== id))
            setNotification({kind: 'note', content: `${name} was removed succesfully`})
            setTimeout(() => {
              setNotification(null)
            }, 5000);
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== id))
            setNotification({kind: 'error', content: `${name} has allready removed from server`})
            setTimeout(() => {
              setNotification(null)
            }, 5000);
          })
      }
    }
  }

  const updatePerson = (person) => {
    const newPerson = {
      name: person.name,
      number: newNumber,
    }
    personService.update(person.id, newPerson)
      .then(response => {
        console.log(response)
        const oldPersons = persons.filter(person => person.id !== response.id)
        setPersons(oldPersons.concat(response).sort((a,b) => a.id - b.id))
        setNewName('')
        setNewNumber('')
        setNotification({kind: 'note', content: `${person.name} has been updated`})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.data)
        setNotification({kind: 'error', content: `Information of ${person.name} has allready been removed from server`})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if(event.target.value !== '') setFiltered(persons.filter(person => person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={filter} handle={handleFilterChange} />
      <h2>Add new</h2>
      <Add name={newName} nameChange={handleNameChange} number={newNumber} numberChange={handleNumberChange} submitForm={addPerson} />
      <h2>Numbers</h2>
      <table>
        <tbody>
          {filter === '' ?
          persons.map((person) => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td>
          <td><button onClick={removePerson(person.name, person.id)}>delete</button></td></tr>) :
          filtered.map((person) => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td>
          <td><button onClick={removePerson(person.name, person.id)}>delete</button></td></tr>)
          }
        </tbody>
      </table>
    </div>
  )

}

export default App
