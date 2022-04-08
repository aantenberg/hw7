import React, { useState } from 'react'
import axios from 'axios'

const QuestionDisplay = ({
  _id, questionText, author, answer, isLoggedIn,
}) => {
  const [newAnswer, setNewAnswer] = useState('')
  const postAnswer = async () => {
    try {
      await axios.post('/questions/answer', { _id, answer: newAnswer })
      setNewAnswer('')
      document.getElementById('answerInput').value = ''
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to post answer')
    }
  }

  return (
    questionText !== undefined
      ? (
        <div className="card correct-padding">
          <h4>
            {author === undefined ? '' : `${author}'s `}
            Question:&nbsp;
          </h4>
          <h2>{questionText}</h2>
          <hr />
          <h6>
            Answer:&nbsp;
            {answer !== undefined && answer !== '' ? answer : `No answer yet! L${isLoggedIn ? '' : 'og in to l'}eave one below!`}
          </h6>
          <hr />
          {isLoggedIn && questionText !== undefined
            ? (
              <>
                <p>Answer the question yourself!</p>
                <textarea id="answerInput" className="write-area" onChange={e => setNewAnswer(e.target.value)} placeholder="Answer..." />
                <button type="button" className="btn purple-btn fullwidth" onClick={() => postAnswer()}>Submit answer!</button>
              </>
            ) : <></>}
        </div>
      ) : <></>
  )
}

export default QuestionDisplay
