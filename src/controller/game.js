import { levels } from '../model/levels'
import { level } from '../model/state'
import PuzzleDisplay from '../view/puzzle'

const left = (event) => event.keyCode === 37 || event.keyCode === 65
const up = (event) => event.keyCode === 38 || event.keyCode === 87
const right = (event) => event.keyCode === 39 || event.keyCode === 68
const down = (event) => event.keyCode === 40 || event.keyCode === 83
const isMove = (event) => [left, up, right, down].some((fn) => fn(event))

function moveTo(index, [rowMove, columnMove]) {
  const height = levels[level].map.length
  const width = levels[level].map[0].length
  const newRow = (Math.floor(index / height) + rowMove + width) % width
  const newColumn = ((index % width) + columnMove + height) % height
  const newIndex = newRow * width + newColumn

  return newIndex
}

function movePlayer(event) {
  const squares = document.querySelectorAll('.player-image')
  const playerOn = document.querySelector('.player-image.active')
  const currentIndex = [...squares].indexOf(playerOn)
  let newIndex

  if (left(event)) {
    newIndex = moveTo(currentIndex, [0, -1])
  } else if (right(event)) {
    newIndex = moveTo(currentIndex, [0, 1])
  } else if (up(event)) {
    newIndex = moveTo(currentIndex, [-1, 0])
  } else if (down(event)) {
    newIndex = moveTo(currentIndex, [1, 0])
  }

  PuzzleDisplay.movePlayer(playerOn, squares[newIndex])

  return newIndex
}

export function updateGame(event) {
  if (isMove(event)) movePlayer(event)
}
