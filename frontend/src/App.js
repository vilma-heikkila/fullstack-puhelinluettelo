import { useState, useEffect } from 'react'
import contactservice from './services/contacts'

const Notification = ({text}) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
  }

  if (text === null) {
    return null
  }
  return (
    <div style={notificationStyle} className="error">
      {text}
    </div>
  )
}

const FilterForm = (props) => {
  return (
    <form>
          <div>
            filter: <input value={props.value} onChange={props.handler}/>
          </div>
        </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.function}>
        <div>
          name: <input value={props.name} onChange={props.namehandler} />
        </div>
        <div>
          number: <input value={props.number} onChange={props.numberhandler} />
        </div>
        <div>
          <button type="submit">add</button>
          <p></p>
        </div>
      </form>
  )
}

const Contact = ({person, remove}) => {
  return (
    <li>
      {person.name} {person.number}
      {<button onClick={remove}>delete</button>}
    </li>
  )
}

const Contacts = ({contactsToShow, removecontact}) => {
  return (
    <ul>
        {contactsToShow.map(person => <Contact key={person.id} person={person} 
        remove={() => removecontact(person.id)}/>)}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const baseurl = 'http://localhost:3001/persons'

  useEffect(() => {
    contactservice
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      number: newNumber
    }

    const names = persons.map(persons => persons.name);
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook` )
    }
    
    else {
      contactservice
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          console.log(response.data)
        })
        .then(setErrorMessage(`${newName} added`), 
        setTimeout(() => 
        {setErrorMessage(null)}, 3000)
        )}
    setNewName('')
    setNewNumber('')
  }

  const removeContact = (id) => {
    if (window.confirm('Delete?')) {
      contactservice
      .remove(id)
      .then(contactservice
        .getAll()
        .then(response => {
          setPersons(response.data)
        }))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const contactsToShow = persons.filter(person => person.name.includes(filterValue))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={errorMessage}/>
      <FilterForm value={filterValue} handler={handleFilterChange}/>

      <h2>Add a new contact</h2>
      <PersonForm function={addName} name={newName} namehandler={handleNameChange} number={newNumber} numberhandler={handleNumberChange}/>

      <h2>Numbers</h2>
      <Contacts contactsToShow={contactsToShow} removecontact={removeContact}/>
    </div>
  )

}

export default App