import PuzzleCrossword from './model'
import View from './view'

class Controller {
  constructor() {
    this.model = new PuzzleCrossword()
    this.view = new View()

    this.view.playGameEvent.addListener(move => this.model.play(move))

    this.model.moveEvent.addListener(moveTo => this.view.movePlayer(moveTo))

    this.model.answerEvent.addListener(answer => this.view.updateAnswer(answer))
    this.model.movesEvent.addListener(moves => this.view.updateMoves(moves))
  }

  run() {
    const { playerAt, levelMap, hint, solution, level, moves, width, height } = this.model
    this.view.render(playerAt, levelMap, hint, solution, level, moves, width, height)
  }
}

export default Controller
