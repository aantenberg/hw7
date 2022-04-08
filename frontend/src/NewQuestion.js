import React, { useState } from 'react'
import axios from 'axios'

const NewQuestion = ({ isWritingQuestion, setIsWritingQuestion }) => {
  const [questionText, setQuestionText] = useState('')
  const postQuestion = async () => {
    try {
      await axios.post('/questions/add', { questionText })
      setIsWritingQuestion(false)
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to post question')
    }
  }
  return (
    <>
      <div className="modal-container">
        <div className="my-modal">
          <h2>New Question: </h2>
          <textarea className="fullwidth write-area" onChange={e => setQuestionText(e.target.value)} />
          <button type="button" className="btn btn-primary" style={{ marginRight: 10, marginTop: 10 }} onClick={() => postQuestion()}>Save</button>
          <button type="button" className="btn btn-danger" style={{ marginRight: 10, marginTop: 10 }} onClick={() => setIsWritingQuestion(!isWritingQuestion)}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default NewQuestion
