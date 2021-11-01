import express, { json } from 'express'
import { connect } from 'mongoose'
import router from './routes'
const app = express()
const port = 8000
const hostname = 'localhost'

require('dotenv').config()

connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(res => console.log(`Connect successful ${res}`))
.catch(res => console.log(`Error in DB connection ${res}`))

app.use(json())

app.use('/api', router)

app.listen(port, hostname, () => {
  console.log(`Application is listening at port ${port}`)
})
