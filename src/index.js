import express from 'express'
import cors from 'cors'
import { routes } from './routs/routs.js'
import { initializeDbConnection } from './config/mongodb.js'
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 5001

routes.forEach(route => {
    app[route.method](route.path, route.handler)
})

initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    })
