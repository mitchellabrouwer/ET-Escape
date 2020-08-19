import { maps } from '../model/maps'
import { currentLevel } from '../model/state'
import { moveHorizontal, moveVertical } from '../view/actions'

const left = (event) => event.keyCode === 37 || event.keyCode === 65
const up = (event) => event.keyCode === 38 || event.keyCode === 67
const right = (event) => event.keyCode === 39 || event.keyCode === 68
const down = (event) => event.keyCode === 40 || event.keyCode === 83

export function updateGame(event) {
  const squares = document.querySelectorAll('.player-image')
  const playerOn = document.querySelector('.player-image.active')
  const height = maps[currentLevel].length
  const width = maps[currentLevel][0].length
  const index = [...squares].indexOf(playerOn)
  const row = Math.floor(index / height)
  const column = index % width

  if (left(event)) {
    moveHorizontal(playerOn, [row, column - 1], width, squares)
  } else if (right(event)) {
    moveHorizontal(playerOn, [row, column + 1], width, squares)
  } else if (up(event)) {
    moveVertical(playerOn, [row - 1, column], width, height, squares)
  } else if (down(event)) {
    moveVertical(playerOn, [row + 1, column], width, height, squares)
  }
}
