import levels from '../model/levels'
import PuzzleDisplay, { createAnswer, updateAnswer } from '../view/puzzle'

export const isCorrect = (answer, level) => answer === levels[level].solution
export const isFinished = (answer, level) =>
  answer.length === levels[level].solution.length

export const startLevel = level => {
  new PuzzleDisplay(levels[level].map).render()
  createAnswer(levels[level].solution)
}

export const processSquare = (answer, square) => {
  const letter = square.textContent

  if (letter) {
    answer += letter
    PuzzleDisplay.toggleLetter(square)
    updateAnswer(answer)
  }

  return answer
}
