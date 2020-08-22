import levels from '../model/levels'
import PuzzleDisplay from '../view/puzzle'

export const isCorrect = (answer, level) => answer === levels[level].answer
export const isFinished = (answer, level) =>
  answer.length === levels[level].answer.length

export const startLevel = level => {
  new PuzzleDisplay(levels[level].map).render()
}

export const processSquare = (answer, square) => {
  const letter = square.innerHTML
  const newSquare = square
  let updatedAnswer = answer

  if (letter) {
    updatedAnswer += letter
    // newSquare.innerHTML = ''
    PuzzleDisplay.toggleLetter(newSquare)
  }

  return updatedAnswer
}
