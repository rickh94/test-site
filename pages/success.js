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

const bar1 = new ProgressBar.Line('#choice1-votes', options)
const bar2 = new ProgressBar.Line('#choice2-votes', options)
const bar3 = new ProgressBar.Line('#choice3-votes', options)

document.addEventListener('DOMContentLoaded', () => {
  bar1.animate(0.2)
  bar2.animate(0.6)
  bar3.animate(0.2)
})
