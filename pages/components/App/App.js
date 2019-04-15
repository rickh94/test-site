import React, { Component, useState } from 'react'

import '../../index.scss'
import ContestForm from '../ContestForm'

const App = () => {
  const [choice, setChoice] = useState(null)
  return (
    <div className="container">
      {choice ? (
        <div>Choice Selected: {choice}</div>
      ) : (
        <ContestForm setChoice={newChoice => setChoice(newChoice)} />
      )}
    </div>
  )
}

export default App
