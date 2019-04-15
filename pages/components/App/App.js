import React, { Component } from 'react'
import { Provider, Subscribe, Container } from 'unstated'

import '../../index.scss'
import ContestForm from '../ContestForm'

class SelectionContainer extends Container {
  state = { choice: null }
  submit = async choice => {
    await this.setState({ choice })
    console.log(this.state)
  }
}

const AppInternal = () => {
  return (
    <Subscribe to={[SelectionContainer]}>
      {selection => (
        <div className="container">
          {selection.state.choice ? (
            <div>Choice Selected: {selection.state.choice}</div>
          ) : (
            <ContestForm setChoice={selection.submit} />
          )}
        </div>
      )}
    </Subscribe>
  )
}

const App = () => (
  <Provider>
    <AppInternal />
  </Provider>
)

export default App
