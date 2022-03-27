const { application } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))

let contacts = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323532"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
    {
        id: 5,
        name: "test test",
        number: "00000"
    }
]

// get phonebook info
app.get('/info', (req, res) => {
    res.send('Phonebook has info for '+ contacts.length + ' people\r\n' + new Date())
  })
  
// get single contact
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(contact => contact.id === id)

    if (contact) {
        res.json(contact)
    } else {
        res.status(404).end()
    }
})

// get all contacts
app.get('/api/persons', (req, res) => {
    res.json(contacts)
})

// delete contact
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(person => person.id !== id)
  
    response.status(204).end()
})

// add new contact
app.post('/api/persons', (request, response) => { 
    const body = request.body
    const name = body.name
    const number = body.number
    const names = contacts.map(person => person.name)

    if (!name || !number) {
        return response.status(400).json({
            error: 'content missing'
        })
    } else if (names.includes(name)) {
        return response.status(400).json({
            error: 'name exists'
        })
    }

    const contact = {
        id: Math.floor(Math.random()*100),
        name: name,
        number: number
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
