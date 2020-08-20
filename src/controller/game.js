import { levels } from '../model/levels'
import { level } from '../model/state'
import PuzzleDisplay from '../view/puzzle'

const left = (event) => event.keyCode === 37 || event.keyCode === 65
const up = (event) => event.keyCode === 38 || event.keyCode === 67
const right = (event) => event.keyCode === 39 || event.keyCode === 68
const down = (event) => event.keyCode === 40 || event.keyCode === 83

function move(currentNode, index, [rowMove, columnMove], squares) {
  const height = levels[level].map.length
  const width = levels[level].map[0].length
  const newRow = (Math.floor(index / height) + rowMove + width) % width
  const newColumn = ((index % width) + columnMove + height) % height
  const newNode = squares[newRow * width + newColumn]

  PuzzleDisplay.movePlayer(currentNode, newNode)
}

export function updateGame(event) {
  const squares = document.querySelectorAll('.player-image')
  const playerOn = document.querySelector('.player-image.active')

  const index = [...squares].indexOf(playerOn)

  if (left(event)) {
    move(playerOn, index, [0, -1], squares)
  } else if (right(event)) {
    move(playerOn, index, [0, 1], squares)
  } else if (up(event)) {
    move(playerOn, index, [-1, 0], squares)
  } else if (down(event)) {
    move(playerOn, index, [+1, 0], squares)
  }
}
