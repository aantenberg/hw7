const express = require('express')

const User = require('../models/User')
const Question = require('../models/Question')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('', async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/add', isAuthenticated, async (req, res) => {
  const { body: { questionText } } = req
  const { session: { username: author } } = req
  try {
    await Question.create({ questionText, author, answer: '' })
    res.send(`question "${questionText}" posted!`)
  } catch (e) {
    res.send('adding question had a problem')
  }
})

router.post('/answer', isAuthenticated, async (req, res) => {
  const { body: { _id, answer } } = req
  try {
    await Question.updateOne({ _id }, { answer })
    res.send('answered!')
  } catch (e) {
    res.send('answering had a problem')
  }
})

module.exports = router
