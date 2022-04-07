import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { create } from '../../backend/models/User'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div id="card">
      <h1>Sign Up</h1>
      <input className="grey-border" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="grey-border" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="button" className="btn btn-primary" onClick={() => console.log(username)}>Sign Up</button>
      <br />
      <br />
      <p className="link">Already have an account? Click&nbsp;</p>
      <Link className="link" to="/account/login">here</Link>
      <p className="link">&nbsp;to login</p>
    </div>
  )
}

export default SignupPage
