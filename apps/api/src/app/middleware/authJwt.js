import * as jwt from 'jsonwebtoken'

const jwtSecret = process.env.NX_JWT_SECRET

export default function verifyToken(req, res, next) {
  let token = req.headers['x-access-token']
  if (!token) return res.status(403).send({ message: 'No token provided!' })
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Unauthorized!' })
    req.userId = decoded.id
    next()
  })
}
