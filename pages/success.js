import ProgressBar from 'progressbar.js'

const options = {
  easing: 'easeIn',
  text: {
    style: {
      color: '#999',
      // position: 'relative',
      // right: '0',
      // top: '30px',
      // padding: 0,
      margin: '1vh 0 0 50vw',
      transform: null
    },
    autoStyleContainer: false
  },
  color: '#ffb821',
  step: (state, bar) => {
    bar.setText(Math.round(bar.value() * 100) + '%')
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const resultsDiv = document.getElementById('results')
  fetch(
    'https://form.temptestsites.online/.netlify/functions/current-standings',
    { mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }) }
  )
    .then(res => res.json())
    .catch(err => {
      document
        .getElementById('error')
        .appendChild(document.createTextNode(`Something has gone wrong: ${err}`))
    })
    .then(results => {
      document.getElementById('loading').style.display = 'none'
      let i = 0
      for (const candidate in results.candidates) {
        const p = document.createElement('p')
        p.appendChild(document.createTextNode(candidate))
        const barDiv = document.createElement('div')
        barDiv.id = `bar-${i}`
        resultsDiv.appendChild(p)
        resultsDiv.appendChild(barDiv)
        const bar = new ProgressBar.Line(`#bar-${i}`, options)
        i += 1
        bar.animate(results.candidates[candidate] / results.totalVotes)
      }
    })
})
