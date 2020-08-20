export function moveHorizontal(playerOn, [row, newColumn], width, squares) {
  const keepInRow = (newColumn + width) % width
  const newIndex = row * width + keepInRow

  playerOn.classList.remove('active')
  squares[newIndex].classList.add('active')
}

export function moveVertical(playerOn, [newRow, column], width, height, squares) {
  const keepInColumn = (newRow + height) % height
  const newIndex = keepInColumn * width + column

  playerOn.classList.remove('active')
  squares[newIndex].classList.add('active')
}
//

// export function moveVertical(prevNode, moveTo, totalSquares, level) {
//   let newIndex = moveTo

//   if (moveTo >= totalSquares) {
//     newIndex = moveTo - totalSquares
//   } else if (moveTo < 0) {
//     newIndex = totalSquares + moveTo
//   }

//   prevNode.classList.remove('active')
//   // console.log(newIndex)

//   level[newIndex].firstChild.classList.add('active')
// }

//   let newIndex = moveTo

// //   console.log(moveTo, 'moveTo')
// //   // if (moveTo === -1) {
// //   //   newIndex = width - 1
// //   if (moveTo % width === 0) {
// //     newIndex = moveTo - width
// //   }

// //   prevNode.classList.remove('active')
// //   console.log(newIndex, 'newIndex')
// //   level[newIndex].firstChild.classList.add('active')
// // }
