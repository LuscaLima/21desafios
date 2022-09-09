let seconds = 0
let minutes = 0
let intervalID = null
const trackerMarkers = []
const ONE_SECOND = 1_000 // milliseconds
const buttons = {
  play: document.querySelector('.play'),
  stop: document.querySelector('.stop'),
  pause: document.querySelector('.pause')
}
const display = {
  minutes: document.querySelector('.minutes'),
  seconds: document.querySelector('.seconds'),
  tracker: document.querySelector('.tracker')
}
const state = new Proxy(
  {
    hasPlay: true,
    hasPause: false,
    hasStop: false
  },
  {
    set(target, key, value) {
      if (target[key] === value) return false

      target[key] = value

      const button = key.replace('has', '').toLowerCase()
      toggleVisibility(buttons[button])

      return true
    }
  }
)

buttons.play.addEventListener('click', play)
buttons.stop.addEventListener('click', stop)
buttons.pause.addEventListener('click', pause)

mountTracker()

function play() {
  state.hasPlay = false
  state.hasPause = true
  state.hasStop = true

  intervalID = setInterval(() => {
    toggleTracker(seconds++)

    if (seconds % 60 === 0) {
      seconds = 0
      minutes++
    }

    if (minutes % 60 === 0) {
      minutes = 0
    }

    render(display.seconds, timeToText(seconds))
    render(display.minutes, timeToText(minutes))
  }, ONE_SECOND)
}

function stop() {
  clearInterval(intervalID)
  trackerMarkers.forEach(marker => marker.classList.remove('active'))

  state.hasStop = false
  state.hasPause = false
  state.hasPlay = true
  seconds = minutes = 0

  render(display.seconds, timeToText(0))
  render(display.minutes, timeToText(0))
}

function pause() {
  state.hasPause = false
  state.hasPlay = true
  state.hasStop = true

  clearInterval(intervalID)
}

function toggleVisibility(el) {
  el.classList.toggle('show')
}

function toggleTracker(second) {
  if (second === 0) {
    trackerMarkers[59].classList.remove('active')
  }

  trackerMarkers[(second % 60) - 1]?.classList.remove('active')
  trackerMarkers[second % 60]?.classList.add('active')
}

function timeToText(time) {
  return time.toString().padStart(2, '0')
}

function render(el, content) {
  el.innerText = content
}

function mountTracker() {
  for (let i = 0; i < 60; i++) {
    const marker = document.createElement('span')
    marker.setAttribute('class', 'marker')
    trackerMarkers.push(marker)
  }

  display.tracker.append(...trackerMarkers)
}
