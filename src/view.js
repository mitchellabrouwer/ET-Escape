import Event from './event'
import './main.scss'

const left = event => event.keyCode === 37 || event.keyCode === 65
const up = event => event.keyCode === 38 || event.keyCode === 87
const right = event => event.keyCode === 39 || event.keyCode === 68
const down = event => event.keyCode === 40 || event.keyCode === 83

export default class View {
  constructor() {
    this.puzzleContainer = document.querySelector('.puzzle-container')
    this.squares = this.puzzleContainer.childNodes // or create this on the fly?

    this.playGameEvent = new Event()
  }

  removeLevel() {
    this.squares.forEach(node => node.remove())
  }

  movePlayer({ from, to }) {
    this.squares[from].classList.toggle('square-with-player')
    this.squares[to].classList.toggle('square-with-player')
  }

  togglePlayer(index) {
    this.squares[index].classList.toggle('square-with-player')
  }

  toggleLetter(index, letter) {
    this.squares[index].classList.toggle('square-with-letter')
    this.squares[index].textContent = letter || ''
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

  render(playerAt, levelMap, width, height) {
    if (this.squares.length) this.removeLevel()

    this.setCssVariables(width, height)
    this.addKeyboardListeners(width)

    levelMap.forEach((token, i) => {
      const cell = document.createElement('div')

      cell.addEventListener('click', () =>
        this.playGameEvent.trigger({ index: i })
      )

      this.puzzleContainer.appendChild(cell).className = `puzzle-square`

      if (playerAt === i) {
        this.togglePlayer(i)
      } else if (/[A-Z]/g.test(token)) {
        this.toggleLetter(i, token)
      } else {
        this.toggleEmpty(i)
      }
    })
  }
}
