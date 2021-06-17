const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

// const messageController = require('./controllers/messageController.js') <-- this is a written out statement that is reflected by the destructured statement below.

const {createMessage} = require('./messageController.js') //this is destructuring of the above statement, allows for multiple function calls on one line

app.post('/api/messages', createMessage)

const SERVER_PORT = 4004
app.listen(4004, () => console.log(`Running on ${SERVER_PORT}`))
