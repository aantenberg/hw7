const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const User = require('../models/User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { body } = req
  const { username, password } = body
  try {
    await User.create({ username, password })
    res.send('user creation was successful')
  } catch (e) {
    res.send('user creation had a problem')
  }
})

router.post('/login', async (req, res) => {
  const { body } = req
  const { username, password } = body
  try {
    const user = await User.findOne({ username, password })
    const { username: newUsername, password: newPassword } = user
    req.session.username = newUsername
    req.session.password = newPassword
    res.send(`logged in as ${req.session.username}`)
  } catch (e) {
    res.send('username or password is incorrect')
  }
})

router.post('/logout', isAuthenticated, async (req, res) => {
  try {
    req.session.username = undefined
    req.session.password = ''
    res.send('logged out')
  } catch (e) {
    res.send('not logged in!')
  }
})

module.exports = router
