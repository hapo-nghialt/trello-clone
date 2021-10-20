import express from 'express'
import cors from 'cors'
import { connectDB } from '@/config/mongodb'
import { api } from '@/routes/v1'

require('dotenv').config()

const hostname = process.env.APP_HOST
const port = process.env.APP_PORT

connectDB()
  .then(() => console.log('Connected successfully to database server'))
  .then(() => bootServer())
  .catch(err => {
    console.log(err)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  app.use(cors())

  // Enable req.body data
  app.use(express.json())

  app.use('/v1', api)

  app.listen(port, hostname, () => {
    console.log(`Server starting at ${hostname}:${port}`)
  })
}

connectDB()

const app = express()
app.use(cors())

app.use('/v1', api)
