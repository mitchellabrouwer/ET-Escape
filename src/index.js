import updateGame from './controller/game'
import './main.scss'

// intro

updateGame()

document.addEventListener('keydown', updateGame, false)

// submit button to run update game
