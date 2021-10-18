// import express from 'express'
// import cors from 'cors'
// import { connectDB } from '@/config/mongodb'
import { api } from '@/routes/v1'
// import mongoose from 'mongoose'


require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

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

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

connectDB()

const app = express()
app.use(cors())

app.use('/v1', api)

app.listen(port, hostname, () => {
  console.log(`Server starting at ${hostname}:${port}`)
})
