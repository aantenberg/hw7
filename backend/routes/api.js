const express = require('express')

const User = require('../models/User')
const Question = require('../models/Question')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('', async (req, res, next) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (e) {
    next(e)
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { body: { questionText } } = req
  const { session: { username: author } } = req
  try {
    await Question.create({ questionText, author, answer: '' })
    res.send(`question "${questionText}" posted!`)
    next()
  } catch (e) {
    next(e)
  }
})

router.post('/answer', isAuthenticated, async (req, res, next) => {
  const { body: { _id, answer } } = req
  try {
    await Question.updateOne({ _id }, { answer })
    res.send('answered!')
    next()
  } catch (e) {
    next(e)
  }
})

router.get('/isloggedin', async (req, res) => {
  if (req.session.username !== undefined) {
    res.json({ loggedIn: true })
  } else {
    res.json({ loggedIn: false })
  }
})

module.exports = router
