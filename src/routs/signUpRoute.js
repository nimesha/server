import { getDbConnection } from '../config/mongodb.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtSecret, jwtExpirationTime } from '../config/key.js'

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        try {
            const { email, password } = req.body
            const db = getDbConnection()
            const user = await db.collection('users').findOne({ email })

            if (user) {
                return res.status(409).json('User already exist')
            }

            const passwordHash = await bcrypt.hash(password, 10)

            const startingInfo = {
                hairColor: '',
                favoriteFood: '',
                bio: ''
            }

            const result = await db.collection('users').insertOne({
                email,
                passwordHash,
                info: startingInfo,
                isVerified: false
            })

            const { insertedId } = result

            jwt.sign(
                {
                    id: insertedId,
                    email,
                    info: startingInfo,
                    isVerified: false
                },
                jwtSecret,
                {
                    expiresIn: jwtExpirationTime
                },
                (err, token) => {
                    if (err) {
                        return res.status(500).send(err)
                    }
                    return res.status(200).json({ token })
                }
            )
        } catch (error) {
            return res.status(422).json(error)
        }
    }
}
