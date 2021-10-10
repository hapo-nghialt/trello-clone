const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri = process.env.MONGODB_URI

let dbInstance = null

export const connectDB = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // Connect the client to the server
  await client.connect()

  // Assign clientDB to dbInstance
  dbInstance = client.db(process.env.DATABASE_NAME)
}

// Get database instance
export const getDB = () => {
  if (!dbInstance) throw new Error('Must connect to database')
  return dbInstance
}
