import bcript from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getDbConnection } from '../config/mongodb.js'
import { jwtSecret, jwtExpirationTime } from '../config/key.js'

export const LoginRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body
        const db = getDbConnection()
        const user = await db.collection('users').findOne({ email })

        if (!user) return res.status(401).json({ message: 'unauthorized to access' })

        const { _id: id, isVerified, passwordHash, info } = user

        const isCorrect = await bcript.compare(password, passwordHash)

        if (!isCorrect) return res.status(401).json({ message: 'unauthorized to access' })

        jwt.sign(
            { id, isVerified, email, info },
            jwtSecret,
            {
                expiresIn: jwtExpirationTime
            },
            (err, token) => {
                if (err) {
                    return res.status(500).send({ message: err })
                }
                return res.status(200).json({ token })
            })
    }

}
