import db from '../db'
const User = db.user

export default async function checkDuplicateEmail(req, res, next) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (user) {
      res.status(400).send({ message: 'Failed! Email is already in use!' })
      return
    }
    next()
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

