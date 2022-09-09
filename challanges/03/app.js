const input = document.querySelector('.input input')
const output = document.querySelector('.output output')
const keys = Array.from(document.querySelectorAll('.key'))
let calculusSeries = []
let calculusDisplay = []
let currentNumber = ''
let isOperatorLastInput = false
let isEqualLastInput = false
let lastNumber = ''
let lastOperation = []
let bracketsCounter = 0

for (const key of keys) {
  key.addEventListener('click', handleClickKey)
}

function handleClickKey(event) {
  const name = event.target.name
  const value = event.target.value

  console.log(typeof value)
  if (Number(value) || value === '0') {
    if (isEqualLastInput) {
      clear('0')
      isEqualLastInput = false
    }

    concatCurrent(value)
    renderInput()
  } else if (value === '.') {
    if (!currentNumber.includes('.')) {
      if (!currentNumber) resetCurrent('0')
      concatCurrent(value)
      renderInput()
    }
  } else if (value === 'plusminus') {
    if (currentNumber) {
      plusminus()
      renderInput()
    }
  } else if (isOperation(value)) {
    if (isEqualLastInput) {
      clear(currentNumber, { currentTo: false })
      isEqualLastInput = false
    }

    const number = isLast(')') ? '' : Number(currentNumber)
    addSerie([number, value])
    addDisplay([number, name])
    renderOutput()
    isOperatorLastInput = true
    lastOperation = [name, value]
  } else if (value === '(') {
    if (isLast(')')) return

    addSerie(value)
    addDisplay(value)
    bracketsCounter++
    renderOutput()
  } else if (value === ')') {
    if (bracketsCounter <= 0) return
    const number = isLast(')') ? '' : Number(currentNumber)
    addSerie([number, value])
    addDisplay([number, value])
    bracketsCounter--
    renderOutput()
  } else if (name === 'sqr') {
    const number = isLast(')') ? '' : Number(currentNumber)
    addSerie([`Math.pow(${number}, 2)`])
    addDisplay([`sqr(${number})`])
    renderOutput()
  } else if (name === 'sqrt') {
    const number = isLast(')') ? '' : Number(currentNumber)
    addSerie([`Math.sqrt(${number}, 2)`])
    addDisplay([`√(${number})`])
    renderOutput()
  } else if (value === 'ce') {
    resetCurrent()
    renderInput('0')
  } else if (value === 'c') {
    clear('0')
  } else if (value === 'backspace') {
    if (typeof currentNumber === 'string') {
      backspace()
    } else {
      resetOutput()
    }

    renderInput()
    renderOutput()
  } else if (value === 'equals') {
    if (isEqualLastInput) {
      resetOutput([currentNumber, lastOperation[0], lastNumber, name])
      resetInput([currentNumber, lastOperation[1], lastNumber])
    } else {
      const number = isLast(')') ? '' : Number(currentNumber)
      lastNumber = number
      addSerie([number])
      addDisplay([number, name])
      isEqualLastInput = true
    }

    renderOutput()
    resetCurrent(resolve())
    renderInput()
  }
}

function concatCurrent(value) {
  if (isOperatorLastInput) {
    currentNumber = value
    isOperatorLastInput = false
    return
  }

  currentNumber += value
}

function resetCurrent(value = '') {
  currentNumber = value
}

function resetInput(value = []) {
  calculusSeries = value
}

function resetOutput(value = []) {
  calculusDisplay = value
}

function renderInput(value = currentNumber) {
  input.setAttribute('value', value)
}

function renderOutput(value = calculusDisplay) {
  output.innerText = value.join(' ')
}

function isOperation(value) {
  return ['+', '-', '*', '/'].includes(value)
}

function addSerie(value) {
  calculusSeries = calculusSeries.concat(value)
}

function addDisplay(value) {
  calculusDisplay = calculusDisplay.concat(value)
}

function plusminus() {
  currentNumber =
    currentNumber[0] === '-' ? currentNumber.substring(1) : `-${currentNumber}`
}

function backspace() {
  currentNumber = currentNumber.substring(0, currentNumber.length - 1) || '0'
}

function isLast(target) {
  return calculusSeries.toString().endsWith(target)
}

function clear(defaultValue, { currentTo } = { currentTo: true }) {
  if (currentTo) resetCurrent()
  resetInput()
  resetOutput()
  renderInput(defaultValue)
  renderOutput()
}

function resolve() {
  return eval(calculusSeries.join(''))
}
