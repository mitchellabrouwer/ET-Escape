import PuzzleDisplay from '../view/puzzle';
import { isCorrect, isFinished, processSquare, startLevel } from './actions';
import movePlayer, { isMove } from './move';

let level = 1
// let moves = 0
let answer = ''
// let complete = false

// eslint-disable-next-line consistent-return
export default function updateGame(event) {
  const squares = document.querySelectorAll('.puzzle-square')

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
