import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello12')
})

app.listen(port, hostname, () => {
  console.log(`Server starting at ${hostname}:${port}`)
})
