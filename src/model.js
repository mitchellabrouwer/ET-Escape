import Event from './event'
import levels from './levels'

const player = 'P1'

export default class PuzzleCrossword {
  constructor(level = 1) {
    this.level = level

    this.introductionEvent = new Event()
    this.moveEvent = new Event()
    this.answerEvent = new Event()
    this.movesEvent = new Event()
    this.levelEvent = new Event()
    this.modalEvent = new Event()
    this.removeLetter = new Event()

    this.newLevel()
  }

  isPass() {
    return this.answer === this.solution
  }

  isFail() {
    return this.answer.length === this.solution.length
  }

  newLevel() {
    this.height = levels[this.level].puzzle.length
    this.width = levels[this.level].puzzle[0].length
    this.levelMap = [...levels[this.level].puzzle.flat()]
    this.playerAt = this.levelMap.indexOf(player)
    this.moves = levels[this.level].moves
    this.answer = ''
    this.solution = levels[this.level].solution
    this.hint = levels[this.level].hint
  }

  process() {
    if (this.isPass()) {
      this.modalEvent.trigger({
        header: 'You made it through',
        message: 'Congratulations!!!',
        button: 'Next level',
      })
      this.level += 1
      this.newLevel()
      this.levelEvent.trigger(this)
    } else if (this.isFail()) {
      this.modalEvent.trigger({
        header: 'Lost in wormhole!!',
        message: 'That sucks...luckily this alien can respawn',
        button: 'Play again',
      })
      this.levelEvent.trigger(this)
    }
  }

  updateAnswer() {
    const token = this.levelMap[this.playerAt]
    if (/^[A-Za-z]$/.test(token)) {
      this.answerEvent.trigger({
        letter: token,
        index: this.answer.length,
      })
      this.answer += token
    }
  }

  subtractMove() {
    this.moves -= 1
    this.movesEvent.trigger(this.moves)
  }

  rowFromIndex(index) {
    return (Math.floor(index / this.height) + this.width) % this.width
  }

  columnFromIndex(index) {
    return ((index % this.width) + this.height) % this.height
  }

  validMove(newIndex) {
    const currentIndex = this.playerAt
    return [
      (currentIndex + 1 + this.width) % this.width,
      (currentIndex - 1 + this.width) % this.width,
      (currentIndex + this.width + this.height) % this.height,
      (currentIndex - this.width + this.height) % this.height,
    ].indexOf(newIndex)
  }

  move(index) {
    const row = this.rowFromIndex(index)
    const column = this.columnFromIndex(index)
    const newIndex = row * this.width + column

    if (this.validMove(this.playerAt, newIndex)) {
      this.moveEvent.trigger({ from: this.playerAt, to: newIndex })
      this.playerAt = newIndex
    }

    // what to do if invalid move pressed?
  }

  play({ index, direction }) {
    if (this.level === 0) return this.introductionEvent.trigger()

    this.move(index || this.playerAt + direction)
    this.updateAnswer()
    this.subtractMove()
    this.process()
  }
}
