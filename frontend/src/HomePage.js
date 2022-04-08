/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import QuestionDisplay from './QuestionDisplay'
import NewQuestion from './NewQuestion'

const HomePage = () => {
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [showingQuestion, setShowingQuestion] = useState({})
  const [showingAnswer, setShowingAnswer] = useState('')
  const [isWritingQuestion, setIsWritingQuestion] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const updateQuestionAndAnswerShown = (question, answer) => {
    setShowingQuestion(question)
    setShowingAnswer(answer)
  }
  const logout = async () => {
    try {
      await axios.post('/account/logout')
      setIsLoggedIn(false)
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to log out')
    }
  }

  const axiosGetUsername = async () => {
    try {
      const { data } = await axios.get('/account/username')
      const { name } = data
      setUsername(name)
    } catch (e) {
      alert('Uh oh... something went wrong')
    }
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      const getQuestions = async () => {
        const { data } = await axios.get('/questions')
        setQuestions(data)
      }
      getQuestions()
    }, 2000)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearInterval(intervalID)
  }, [])

  useEffect(() => {
    const getQuestions = async () => {
      const { data } = await axios.get('/questions')
      setQuestions(data)
    }

    getQuestions()
  }, [])

  useEffect(() => {
    const getIsLoggedIn = async () => {
      const { data: { loggedIn } } = await axios.get('/questions/isLoggedIn')
      setIsLoggedIn(loggedIn)
    }

    getIsLoggedIn()
  }, [])

  useEffect(() => {
    axiosGetUsername()
  }, [])
  return (
    <>
      <div className="cw-head">
        <h1>197wire</h1>
        {isLoggedIn
          ? (
            <div style={{ display: 'flex' }}>
              <h2 style={{ padding: '0px 20px', verticalAlign: 'middle' }}>{`Hi, ${username}`}</h2>
              <button type="button" className="btn purple-btn" onClick={() => logout()}>Logout</button>
            </div>
          ) : <></>}
      </div>
      <div className="container">
        <div className="correct-padding">
          {isLoggedIn ? <button type="button" className="btn purple-btn fullwidth" onClick={() => setIsWritingQuestion(true)}>Add New Question +</button> : <button type="button" className="btn purple-btn fullwidth" onClick={() => navigate('/login')}>Log in or Sign up!</button>}
          {questions.map(q => <div role="button" tabIndex={0} className="grey-border" onClick={() => updateQuestionAndAnswerShown(q, q.answer)} key={questions.indexOf(q)} onKeyDown={() => updateQuestionAndAnswerShown(q, q.answer)}>{q.questionText}</div>)}
        </div>
        <QuestionDisplay className="correct-padding" questionText={showingQuestion.questionText} author={showingQuestion.author} answer={showingAnswer} isLoggedIn={isLoggedIn} _id={showingQuestion._id} />
      </div>
      {isWritingQuestion ? <NewQuestion isWritingQuestion={isWritingQuestion} setIsWritingQuestion={setIsWritingQuestion} /> : <></>}
    </>
  )
}

export default HomePage
