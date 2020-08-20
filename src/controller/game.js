import { levels } from '../model/levels'
import PuzzleDisplay from '../view/puzzle'
import movePlayer, { isMove } from './move'

let level = 1
let levelComplete = true
let answer = ''

// collecting letters
const squareHasLetter = (node) => node.classList.contains('square-with-letter')
const puzzleCorrect = (answer) => answer === levels[level].answer
const puzzleFinished = (answer) => answer === levels[level].answer.length

function processSquare(newSquare) {
  // if letter add to answer
  // remove letter from square
  // color square as used
}

function completedLevel() {}

function endOfLevel() {
  new PuzzleDisplay(levels[level].map).render()
  levelComplete = false
}

export function updateGame(event) {
  const squares = document.querySelectorAll('.puzzle-square')

  if (levelComplete) return endOfLevel()

  if (isMove(event)) processSquare(squares[movePlayer(event, level)])

  // if(puzzleCorrect(answer)){
  // level +=1
  // sound
  // piece of ship
  // }

  // if (puzzleFinished(answer)){
  // endOfLevel()
  // }
}
