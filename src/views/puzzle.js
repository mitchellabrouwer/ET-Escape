/* eslint-disable class-methods-use-this */
import Event from '../event'
import '../main.scss'
import Grid from './grid'

const left = event => event.keyCode === 37 || event.keyCode === 65 // update to key not keycode
const up = event => event.keyCode === 38 || event.keyCode === 87
const right = event => event.keyCode === 39 || event.keyCode === 68
const down = event => event.keyCode === 40 || event.keyCode === 83

export default class Puzzle {
  constructor(playerAt, levelMap, hint, solution, moves, width, height) {
    this.hint = hint
    this.solution = solution
    this.moves = moves
    this.width = width
    this.height = height

    this.grid = new Grid(levelMap, playerAt, width, height)
    this.squareNodes = this.grid.squareNodes

    this.answer = document.querySelector('#answer')
    this.answerNodes = this.answer.childNodes

    this.onMove = new Event()
    this.addKeyboardListeners()
  }

  addKeyboardListeners() {
    document.addEventListener('keydown', event => {
      if (left(event)) {
        this.onMove.trigger({ direction: [0, -1] })
      } else if (right(event)) {
        this.onMove.trigger({ direction: [0, +1] })
      } else if (up(event)) {
        this.onMove.trigger({ direction: [-1, 0] })
      } else if (down(event)) {
        this.onMove.trigger({ direction: [+1, 0] })
      }
    })
  }

  createAnswer() {
    Array(this.solution.length)
      .fill('*')
      .forEach(character => {
        const square = document.createElement('div')
        square.textContent = character
        this.answer.appendChild(square).className = `answer-letter`
      })
  }

  updateAnswer({ letter, index }) {
    this.answerNodes[index].textContent = letter
  }

  updateMoves(moves) {
    const movesLeft = document.querySelector('.moves')
    movesLeft.textContent = `${moves} moves remaining`
  }

  updateHint(hint) {
    const levelAt = document.querySelector('.hint')
    levelAt.textContent = `Hint...${hint}`
  }

  resetLevel() {
    if (this.grid.root.hasChildNodes()) {
      this.grid.root.querySelectorAll('*').forEach(n => n.remove())
    }
    if (this.answer.hasChildNodes()) {
      this.answer.querySelectorAll('*').forEach(n => n.remove())
    }
  }

  movePlayer({ from, to }) {
    if (this.squareNodes[from].classList.contains('square-with-letter')) {
      this.grid.toggleLetter(this.squareNodes[from])
    }
    if (this.squareNodes[to].classList.contains('square-with-letter')) {
      this.grid.toggleLetter(this.squareNodes[to])
    }

    this.squareNodes[from].classList.toggle('square-with-player')
    this.squareNodes[to].classList.toggle('square-with-player')
  }

  render() {
    this.resetLevel()
    this.grid.render(this.onMove)
    this.createAnswer()
    this.updateMoves(this.moves)
    this.updateHint(this.hint)
  }
}
