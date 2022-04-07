import React from 'react'
import {
  Routes, Route, Outlet, Link,
} from 'react-router-dom'
import SignupPage from './SignupPage'

const App = () => (
  <Routes>
    <Route path="/">
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<h1>Login</h1>} />
      {/* <Route path="about" element={<About />} />
      <Route path="dashboard" element={<Dashboard />} /> */}

      {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
      <Route path="*" element={<h1>Bad</h1>} />
    </Route>
  </Routes>
)

export default App
