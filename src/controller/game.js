import { maps } from '../model/maps'
import { currentLevel } from '../model/state'
import { moveHorizontal, moveVertical } from '../view/actions'

const left = (event) => event.keyCode === 37 || event.keyCode === 65
const up = (event) => event.keyCode === 38 || event.keyCode === 67
const right = (event) => event.keyCode === 39 || event.keyCode === 68
const down = (event) => event.keyCode === 40 || event.keyCode === 83

export function updateGame(event) {
  const level = document.querySelectorAll('.grid-item')
  const prevNode = document.querySelector('.player-image.active')
  const currentIndex = [...level].indexOf(prevNode.parentNode)
  const height = maps[currentLevel].length
  const width = maps[currentLevel][0].length

  if (left(event)) {
    moveHorizontal(prevNode, currentIndex - 1, width, level)
  } else if (right(event)) {
    moveHorizontal(prevNode, currentIndex + 1, width, level)
  } else if (up(event)) {
    moveVertical(prevNode, currentIndex - width, width, height, level)
  } else if (down(event)) {
    moveVertical(prevNode, currentIndex + width, width, height, level)
  }
}
