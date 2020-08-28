/* eslint-disable class-methods-use-this */
import Event from './event'
import './main.scss'

const left = event => event.keyCode === 37 || event.keyCode === 65
const up = event => event.keyCode === 38 || event.keyCode === 87
const right = event => event.keyCode === 39 || event.keyCode === 68
const down = event => event.keyCode === 40 || event.keyCode === 83

export default class View {
  constructor() {
    this.puzzleContainer = document.querySelector('#puzzle')
    this.answerContainer = document.querySelector('#answer')
    this.squares = this.puzzleContainer.childNodes
    this.answerSquares = this.answerContainer.childNodes

    this.playGameEvent = new Event()
  }

  movePlayer({ from, to }) {
    if (this.squares[from].classList.contains('square-with-letter')) {
      this.toggleLetter(from)
    }
    if (this.squares[to].classList.contains('square-with-letter')) {
      this.toggleLetter(to)
    }

    this.squares[from].classList.toggle('square-with-player')
    this.squares[to].classList.toggle('square-with-player')
  }

  togglePlayer(index) {
    this.squares[index].classList.toggle('square-with-player')
  }

  toggleLetter(index, letter) {
    let span = this.squares[index].querySelector('span')

    if (span === null) {
      span = document.createElement('span')
      span.textContent = letter
      this.squares[index].appendChild(span)
      this.squares[index].classList.toggle('square-with-letter')
    }

    span.classList.toggle('show')
  }

  toggleEmpty(index) {
    this.squares[index].classList.toggle('square-vacant')
  }

  setCssVariables(width, height) {
    this.puzzleContainer.style.setProperty('--puzzle-columns', width)
    this.puzzleContainer.style.setProperty('--puzzle-rows', height)
  }

  addKeyboardListeners(width) {
    document.addEventListener('keydown', event => {
      if (left(event)) {
        this.playGameEvent.trigger({ direction: -1 })
      } else if (right(event)) {
        this.playGameEvent.trigger({ direction: 1 })
      } else if (up(event)) {
        this.playGameEvent.trigger({ direction: -width })
      } else if (down(event)) {
        this.playGameEvent.trigger({ direction: width })
      }
    })
  }

  createAnswer(solution) {
    Array(solution.length)
      .fill('*')
      .forEach(character => {
        const square = document.createElement('div')
        square.textContent = character
        this.answerContainer.appendChild(square).className = `answer-letter`
      })
  }

  updateAnswer({ letter, index }) {
    this.answerSquares[index].textContent = letter
  }

  updateMoves(moves) {
    const movesLeft = document.querySelector('.moves')
    movesLeft.textContent = `${moves} moves remaining`
  }

  levelUp(level) {
    const levelAt = document.querySelector('.hint')
    levelAt.textContent = `hint...${level}`
  }

  openModal({ header, message, button }) {
    const modal = document.querySelector('#modal')
    const close = document.querySelector('.modal-button')
    const heading = document.querySelector('.modal-header')
    const content = document.querySelector('.modal-text')

    heading.textContent = header
    content.textContent = message
    close.textContent = button
    modal.style.display = 'block'

    close.onclick = function closeButton() {
      modal.style.display = 'none'
    }

    window.onclick = function clickOutside(event) {
      if (event.target === modal) {
        modal.style.display = 'none'
      }
    }
  }

  resetLevel() {
    if (this.puzzleContainer.hasChildNodes()) {
      this.puzzleContainer.querySelectorAll('*').forEach(n => n.remove())
    }
    if (this.answerContainer.hasChildNodes()) {
      this.answerContainer.querySelectorAll('*').forEach(n => n.remove())
    }
  }

  render(levelProperties) {
    const { playerAt, levelMap, hint, solution, moves, width, height } = levelProperties
    const levelAt = document.querySelector('.hint')
    levelAt.textContent = `hint...${hint}`

    this.resetLevel()
    this.setCssVariables(width, height)
    this.addKeyboardListeners(width)
    this.createAnswer(solution)
    this.updateMoves(moves)

    levelMap.forEach((token, i) => {
      const cell = document.createElement('div')

      cell.addEventListener('click', () => this.playGameEvent.trigger({ index: i }))

      this.puzzleContainer.appendChild(cell).className = `puzzle-square`

      if (playerAt === i) {
        this.togglePlayer(i)
      } else if (/^[A-Za-z]$/g.test(token)) {
        this.toggleLetter(i, token)
      } else {
        this.toggleEmpty(i)
      }
    })
  }
}