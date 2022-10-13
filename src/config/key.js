import dotEnv from 'dotenv'
dotEnv.config()

export const port = process.env.PORT
export const jwtSecret = process.env.JWT_SECRET
export const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME

export const userMongo = process.env.MONGO_USER
export const passwordMongo = process.env.MONGO_PASSWORD
export const databaseMongo = process.env.MONGO_DATABASE
