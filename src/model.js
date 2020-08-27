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
    this.moves = levels[level].moves
    this.answer = ''
    this.solution = levels[level].solution
    this.hint = levels[level].hint

    this.introductionEvent = new Event()
    this.moveEvent = new Event()
    this.answerEvent = new Event()
    this.movesEvent = new Event()
    this.levelEvent = new Event()
    this.modalEvent = new Event()
    this.removeLetter = new Event()
  }

  isPass() {
    return this.answer === this.solution
  }

  isFail() {
    return this.answer.length === this.solution.length
  }

  process() {
    if (this.isPass()) {
      this.modalEvent.trigger('Congratulations')
      console.log('WIN')
      // this.levelUp()
    } else if (this.isFail()) {
      this.modalEvent.trigger('Try again')
      console.log('LOSE')
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

  levelUp() {
    this.level += 1
    this.levelEvent.trigger(this.level)
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
