import { updateGame } from './controller/game'
import './main.scss'
import { maps } from './model/maps'
import Level from './view/level'

new Level(maps[1]).render()

document.addEventListener('keydown', updateGame, false)
