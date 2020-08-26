import Event from './event'
import levels from './levels'

const player = 'P1'

export default class PuzzleCrossword {
  constructor(level = 1) {
    this.level = level
    this.height = levels[level].puzzle.length
    this.width = levels[level].puzzle[0].length
    this.levelMap = [...levels[level].puzzle.flat()]

    this.playerAt = this.levelMap.indexOf(player)
    this.moves = 0
    this.answer = ''
    this.solution = levels[level].solution

    this.introductionEvent = new Event()
    this.movePlayerEvent = new Event()
    this.modalEvent = new Event()
    this.removeLetter = new Event()
  }

  isPass() {
    return this.answer === this.solution
  }

  isFail() {
    return !this.isPass() && this.answer.length === this.solution.length
  }

  process() {
    if (this.isPass()) {
      this.modalEvent.trigger('Congratulations')
    } else if (this.isFail()) {
      this.modalEvent.trigger('Try again')
    }
  }

  updateAnswer() {
    if (/[A-Za-z]/.test(this.playerAt)) {
      this.answer += this.levelMap[this.playerAt]
    }
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
      this.movePlayerEvent.trigger({ from: this.playerAt, to: newIndex })
      this.playerAt = newIndex
    }

    // what to do if invalid move pressed?
  }

  play({ index, direction }) {
    if (this.level === 0) return this.introductionEvent.trigger()

    this.move(index || this.playerAt + direction)
    this.updateAnswer()
    this.process()

    this.moves += 1
  }
}
