import { select, selectAll } from './utils.js'
import { questions } from './questions.js'
const pages = Array.from(selectAll('.page'))
const menu = Array.from(selectAll('.menu .item'))
const backToMenu = select('.back-to-menu')
const score = select('.score .points')
const questionText = select('.question-text')
const questionOptions = selectAll('.question-option')
const formQuestion = select('.form-question')
const formAdd = select('.form-add')
const question = select('#question')
const options = Array.from(selectAll('.options input'))
const plus = select('.plus')
const state = new Proxy(
  {
    page: 0,
    score: 0,
    next: 0,
    questions: [...questions],
    currentQuestion: {},
    selectedOption: null
  },
  {
    set: handleAppRender
  }
)

menu.forEach((item, index) =>
  item.addEventListener('click', () => {
    state.page = index + 1
  })
)
backToMenu.addEventListener('click', handleBackToMenu)
formQuestion.addEventListener('submit', handleQuestionFormSubmit)
formAdd.addEventListener('submit', handleAddFormSubmit)

function handleAppRender(target, key, value) {
  switch (key) {
    case 'page':
      if (target[key] === value) return true
      pages[target[key]].classList.remove('show')
      pages[value].classList.add('show')
      target[key] = value

      if (value === 0) setVisibilityBackToMenu(false)
      else setVisibilityBackToMenu(true)

      if (value === 1) loadQuestion()

      return true
    case 'score':
      target[key] = value
      score.textContent = String(value).padStart(2, '0')
      return true
    case 'next':
      if (target.questions.length) loadQuestion()
      return true
    default:
      target[key] = value
      return true
  }
}

function handleBackToMenu() {
  state.page = 0
}

function setVisibilityBackToMenu(value) {
  backToMenu.style.opacity = value ? '1' : '0'
}

function handleQuestionFormSubmit(event) {
  event.preventDefault()
  state.selectedOption = event.target.querySelector(
    'input[name="answer"]:checked'
  )

  if (!state.selectedOption) return

  const answer = state.selectedOption.value

  if (isAnswerCorrect(answer)) {
    updateScore()
    answerAnimation(state.selectedOption.parentNode.lastElementChild)
  } else {
    answerAnimation(
      event.target.querySelector(`input[value="${getCorrectAnswer()}"] + label`)
    )
  }
}

function handleAddFormSubmit(event) {
  event.preventDefault()

  if (!isFormValid()) return

  const newQuestion = {
    text: question.value,
    options: options.map(({ value }) => value)
  }

  state.questions.push(newQuestion)
  clearForm()
  plusAnimation()
}

function isFormValid() {
  return [question, ...options].every(({ value }) => value)
}

function clearForm() {
  question.value = ''
  options.forEach(option => (option.value = ''))
}

function loadQuestion() {
  const [question, index] = pickQuestion()
  setQuestion(question)
  state.questions.splice(index, 1)
}

function answerAnimation(element) {
  element.addEventListener('animationend', ({ target }) => {
    target.classList.remove('animation')
    target.removeEventListener('animationend', this)
    state.next++
    state.selectedOption.checked = false
  })
  element.classList.add('animation')
}

function plusAnimation() {
  plus.addEventListener('animationend', ({ target }) => {
    target.classList.remove('animation')
    target.removeEventListener('animationend', this)
  })
  plus.classList.add('animation')
}

function updateScore() {
  state.score++
}

function isAnswerCorrect(answer) {
  return getCorrectAnswer() === answer
}

function getCorrectAnswer() {
  return state.currentQuestion.options[0]
}

function setQuestion({ text, options }) {
  setQuestionText(text)
  setQuestionOptions(options)
}

function setQuestionText(text) {
  questionText.textContent = text
}

function setQuestionOptions(options) {
  const shuffledOptions = [...options].sort(() => Math.random() - 0.5)
  questionOptions.forEach((option, index) => {
    option.firstElementChild.setAttribute('value', shuffledOptions[index])
    option.lastElementChild.textContent = shuffledOptions[index]
  })
}

function pickQuestion() {
  const index = randomNumber(0, state.questions.length - 1)
  const pickedQuestion = state.questions[index]
  state.currentQuestion = pickedQuestion
  return [pickedQuestion, index]
}

function randomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min))
}
