const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://iminoaru:mongopass@authdatacohort.met821i.mongodb.net/sign-log-homemade')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const todoSchema = mongoose.Schema({
    name: String,
    email: String,
    pass: String
})

const schema = mongoose.model('userData' , todoSchema)

module.exports = {schema}