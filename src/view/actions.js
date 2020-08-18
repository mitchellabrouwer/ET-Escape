export function moveHorizontal(prevNode, newIndex, width, level) {
  if (newIndex === -1) {
    newIndex = width - 1
  } else if (newIndex >= width) {
    newIndex = 0
  }

  prevNode.classList.remove('active')
  level[newIndex].firstChild.classList.add('active')
}

export function moveVertical(prevNode, newIndex, width, height, level) {
  const totalSquares = width * height
  if (newIndex < 0) {
    newIndex = totalSquares - newIndex
  } else if (newIndex >= totalSquares) {
    newIndex = newIndex - totalSquares
  }

  prevNode.classList.remove('active')
  level[newIndex].firstChild.classList.add('active')
}
