import Meteor from './Meteor.js'

const canvas = document.querySelector('#meteors')
const context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const canvasHalfHeight = Math.floor(canvas.height / 2)

const meteors = [...Array(40)].map(() =>
  Meteor({
    canvas,
    context,
    x: randomNumber(-canvas.width, canvas.width * 2),
    y: randomNumber(-canvasHalfHeight, canvasHalfHeight),
    size: 40
  })
)
meteorShower()

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

function randomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min))
}

function meteorShower() {
  meteors.forEach(meteor => meteor.update())
  clearCanvas()
  meteors.forEach(meteor => meteor.draw())

  window.requestAnimationFrame(meteorShower)
}
