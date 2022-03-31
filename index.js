const { application } = require('express')
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Contact = require('./models/contact')

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))
app.use(express.static('build'))

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
    Contact.findById(req.params.id).then(contact => {
        res.json(contact)
    })
})

// get all contacts
app.get('/api/persons', (req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts)
    })
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
    const nname = body.name
    const nnumber = body.number
    //const names = contacts.map(person => person.name)

    if (!nname || !nnumber) {
        return response.status(400).json({
            error: 'content missing'
        })
    } /*else if (names.includes(nname)) {
        return response.status(400).json({
            error: 'name exists'
        })
    }*/

    const contact = new Contact({
        name: nname,
        number: nnumber
    })
    contact.save().then(savedContact => {
        response.json(savedContact)
    })
})
  
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
