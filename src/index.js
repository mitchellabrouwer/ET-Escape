import { updateGame } from './controller/game'
import './main.scss'
import { levels } from './model/levels'
import PuzzleDisplay from './view/puzzle'

new PuzzleDisplay(levels[1].map).render()

document.addEventListener('keydown', updateGame, false)
