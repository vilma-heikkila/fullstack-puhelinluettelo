const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newname = process.argv[3]
const newnumber = process.argv[4]

const url = `mongodb+srv://vhmongo:${password}@cluster0.ws739.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: newname,
  number: newnumber
})

contact.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

if (process.argv.length<4) {
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact)
        })
        mongoose.connection.close()
    })
}
