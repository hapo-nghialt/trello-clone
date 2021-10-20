require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

const app = express()
const port = 8000
const hostname = 'localhost'

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(res => console.log(`Connect successful ${res}`))
.catch(res => console.log(`Error in DB connection ${res}`))

app.use(express.json())

app.get('/', (req, res) => {
  res.send(`<h1>Hello world</h1>`)
})

app.listen(port, hostname, () => {
  console.log(`Application is listening at port ${port}`)
})
