import React, { Component, useState } from 'react'
import { Form, Field } from 'react-final-form'

class ContestForm extends Component {
  onSubmit = async values => {
    // await sleep(300)
    // alert(JSON.stringify(values, 0, 2))
    this.props.setChoice(values.winner)
  }

  state = {
    candidates: [],
    shownBios: []
  }

  async componentDidMount() {
    fetch('https://form.temptestsites.online/.netlify/functions/candidates', {
      mode: 'cors',
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(candidates => this.setState({ candidates }))
  }

  bioIsShown = id => {
    return this.state.shownBios.includes(id)
  }

  toggleBio = id => {
    this.setState(oldState => {
      if (oldState.shownBios.includes(id)) {
        return { shownBios: oldState.shownBios.splice(oldState.shownBios.indexOf()) }
      }
    })
  }

  render() {
    const { candidates } = this.state
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <h1>Test form react</h1>
            <div>
              <label>Name</label>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Enter name..."
              />
            </div>
            <div>
              <label>Email</label>
              <Field
                name="email"
                component="input"
                type="email"
                placeholder="Enter email..."
              />
            </div>
            <div>
              <label>Select Winner</label>
              {candidates.map(candidate => (
                <div key={candidate.id}>
                  <Candidate bio={candidate.bio}>
                    <label className="label-container">
                      <Field
                        name="winner"
                        component="input"
                        type="radio"
                        value={candidate.name}
                      />{' '}
                      {candidate.name}
                      <span className="checkmark" />
                      /> */}
                    </label>
                  </Candidate>
                </div>
              ))}
            </div>
            <div className="buttons">
              <button
                type="submit"
                disabled={submitting || pristine}
                className="button"
              >
                Submit
              </button>
              <button
                className="button"
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </form>
        )}
      />
    )
  }
}

function Candidate(props) {
  const [visible, setVisible] = useState(false)
  return (
    <React.Fragment>
      <div className="line">
        {props.children}
        <div
          className={visible ? 'upArrow' : 'downArrow'}
          onClick={() => setVisible(!visible)}
        />
      </div>
      <div style={{ display: visible ? 'block' : 'none' }} className="bio">
        {props.bio}
      </div>
    </React.Fragment>
  )
}

export default ContestForm
