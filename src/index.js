import express from 'express'
import { routes } from './routs/routs.js'
import { initializeDbConnection } from './config/mongodb.js'
const app = express()

const PORT = 5001

routes.forEach(route => {
    app[route.method](route.path, route.handler)
})

// app.listen(PORT, () => {
//     // tslint:disable: no-console
//     console.log(`The server is running on port ${PORT}`)
// })

initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    })
