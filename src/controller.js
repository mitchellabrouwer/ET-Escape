import PuzzleCrossword from './model'
import View from './view'

class Controller {
  constructor() {
    this.model = new PuzzleCrossword()
    this.view = new View()

    this.view.playGameEvent.addListener(move => this.model.play(move))

    this.model.onMove.addListener(moveTo => this.view.movePlayer(moveTo))
    this.model.onAnswer.addListener(answer => this.view.updateAnswer(answer))
    this.model.onUseMove.addListener(moves => this.view.updateMoves(moves))
    this.model.onModal.addListener(message => this.view.openModal(message))
    this.model.onLevel.addListener(model => this.view.render(model))
  }

  run() {
    this.view.showIntroduction()
    this.view.render(this.model)
  }
}

export default Controller
