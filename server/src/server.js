import express from 'express'
import cors from 'cors'
import { connectDB } from '@/config/mongodb'
import { api } from '@/routes/v1'
import mongoose from 'mongoose'

require('dotenv').config()

const hostname = process.env.APP_HOST
const port = process.env.APP_PORT
const uri = process.env.MONGODB_URI

// connectDB()
//   .then(() => console.log('Connected successfully to database server'))
//   .then(() => bootServer())
//   .catch(err => {
//     console.log(err)
//     process.exit(1)
//   })

// const bootServer = () => {
//   const app = express()

//   app.use(cors())

//   // Enable req.body data
//   app.use(express.json())

//   app.use('/v1', api)

//   app.listen(port, hostname, () => {
//     console.log(`Server starting at ${hostname}:${port}`)
//   })
// }

mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => {
    const app = express()

    app.listen(port, hostname, () => {
      console.log(`Server starting at ${hostname}:${port}`)
    })
  })
