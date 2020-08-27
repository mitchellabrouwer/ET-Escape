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
    this.model.modalEvent.addListener(message => this.view.openModal(message))
    this.model.levelEvent.addListener(model => this.view.render(model))
  }

  run() {
    this.view.render(this.model)
  }
}

export default Controller
