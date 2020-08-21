import { levels } from '../model/levels'
import PuzzleDisplay from '../view/puzzle'

export const isCorrect = (answer, level) => answer === levels[level].answer
export const isFinished = (answer, level) => answer.length === levels[level].answer.length

export const startLevel = (level) => {
  new PuzzleDisplay(levels[level].map).render()
}

export const processSquare = (answer, square) => {
  const letter = square.getElementsByTagName('p')[0]

  if (letter) {
    answer += letter.innerText
    square.removeChild(letter)
  }

  return answer
}

export const removeLevel = () => {
  const node = document.getElementById('puzzle')
  node.querySelectorAll('*').forEach((n) => n.remove())
}
