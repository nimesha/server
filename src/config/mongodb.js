import { MongoClient } from 'mongodb'
import { userMongo, passwordMongo, databaseMongo } from '../config/key.js'

let client

export const initializeDbConnection = async () => {
    client = await MongoClient.connect(`mongodb+srv://${userMongo}:${passwordMongo}@cluster0.4kvql.mongodb.net/${databaseMongo}?retryWrites=true&w=majority&wtimeoutMS=5000`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export const getDbConnection = () => {
    const db = client.db()
    return db
}
