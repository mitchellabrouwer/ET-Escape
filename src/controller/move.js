import levels from '../model/levels'
import PuzzleDisplay from '../view/puzzle'

const left = (event) => event.keyCode === 37 || event.keyCode === 65
const up = (event) => event.keyCode === 38 || event.keyCode === 87
const right = (event) => event.keyCode === 39 || event.keyCode === 68
const down = (event) => event.keyCode === 40 || event.keyCode === 83
export const isMove = (event) => [left, up, right, down].some((fn) => fn(event))

function moveTo(index, [rowMove, columnMove], level) {
  const height = level.map.length
  const width = level.map[0].length
  const newRow = (Math.floor(index / height) + rowMove + width) % width
  const newColumn = ((index % width) + columnMove + height) % height
  const newIndex = newRow * width + newColumn

  return newIndex
}

export default function movePlayer(event, level) {
  const nodes = document.querySelectorAll('.puzzle-square')
  const playerOn = document.querySelector('.square-with-player')
  const currentIndex = [...nodes].indexOf(playerOn)

  let newIndex

  if (left(event)) {
    newIndex = moveTo(currentIndex, [0, -1], levels[level])
  } else if (right(event)) {
    newIndex = moveTo(currentIndex, [0, 1], levels[level])
  } else if (up(event)) {
    newIndex = moveTo(currentIndex, [-1, 0], levels[level])
  } else if (down(event)) {
    newIndex = moveTo(currentIndex, [1, 0], levels[level])
  }

  PuzzleDisplay.movePlayer(playerOn, nodes[newIndex])

  return newIndex
}
