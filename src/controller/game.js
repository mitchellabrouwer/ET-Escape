import { isCorrect, isFinished, processSquare, removeLevel, startLevel } from './actions'
import movePlayer, { isMove } from './move'

let level = 1
let moves = 0
let answer = ''
// let complete = false

export function updateGame(event) {
  const squares = document.querySelectorAll('.puzzle-square')

  if (!squares.length) return startLevel(level)

  if (isMove(event)) {
    answer = processSquare(answer, squares[movePlayer(event, level)])
  }

  if (isCorrect(answer, level)) {
    answer = ''
    level += 1
    alert('win!!')
    alert('add more levels now')
    removeLevel()
    updateGame()
  } else if (isFinished(answer, level)) {
    answer = ''
    alert('level finished')
    confirm('retry')
    removeLevel()
    updateGame()
  }
}
