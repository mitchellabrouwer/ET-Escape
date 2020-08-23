import PuzzleDisplay from '../view/puzzle'
import { isCorrect, isFinished, processSquare, startLevel } from './actions'
import movePlayer, { isMove } from './move'

let level = 1
const moves = 0
let answer = ''

// eslint-disable-next-line consistent-return
export default function updateGame(event) {
  const squares = document.querySelectorAll('.puzzle-square')
  const movesDisplay = document.querySelector('.moves')

  movesDisplay.textContent = `${moves} moves remaining`
  // levelDisplay.textContent = `level: ${level} / 10  ` // `${level} / ${levels.length}`

  if (!squares.length) return startLevel(level)

  if (isMove(event)) {
    answer = processSquare(answer, squares[movePlayer(event, level)])
  }

  if (isCorrect(answer, level)) {
    // alert('win!!')
    answer = ''
    level += 1
    // need a timeout here
    // alert('add more levels now')
    PuzzleDisplay.removeLevel()
    updateGame()
  } else if (isFinished(answer, level)) {
    answer = ''
    alert('level finished')
    // confirm('retry')
    PuzzleDisplay.removeLevel()
    updateGame()
  }
}
