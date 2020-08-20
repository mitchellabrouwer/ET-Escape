import { levels } from '../model/levels'
import PuzzleDisplay from '../view/puzzle'
import movePlayer, { isMove } from './move'

let level = 1
let moves = 0
let answer = ''
// let complete = false

const puzzleCorrect = (answer) => answer === levels[level].answer
const puzzleFinished = (answer) => answer.length === levels[level].answer.length

function processSquare(square) {
  const letter = square.getElementsByTagName('p')[0]

  if (letter) {
    answer += letter.innerText
    square.removeChild(letter)
  }

  moves += 1
  // color square as used
}

function startLevel() {
  new PuzzleDisplay(levels[level].map).render()
}

function removeLevel() {
  const node = document.getElementById('puzzle')
  node.querySelectorAll('*').forEach((n) => n.remove())
}

function pass() {
  answer = ''
  level += 1
  alert('win!!')
  alert('add more levels now')
  removeLevel()
  updateGame()
  // sound
}

function fail() {
  answer = ''
  alert('level finished')
  confirm('retry')
  removeLevel()
  updateGame()
}

export function updateGame(event) {
  const squares = document.querySelectorAll('.puzzle-square')

  if (!squares.length) return startLevel()

  if (isMove(event)) processSquare(squares[movePlayer(event, level)])

  if (puzzleCorrect(answer)) {
    return pass()
  } else if (puzzleFinished(answer)) {
    return fail()
  }
}
