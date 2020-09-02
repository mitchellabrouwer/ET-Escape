import Game from './model'
import Modal from './views/modal'
import Pages from './views/pages'
import Puzzle from './views/puzzle'

class Controller {
  constructor() {
    this.model = new Game()

    this.configure()
  }

  configure() {
    this.puzzle = new Puzzle()
    this.pages = new Pages()
    this.modal = new Modal()

    this.puzzle.onMove.addListener(move => this.model.play(move))

    this.model.onModal.addListener(message => this.modal.open(message))
    this.model.onMove.addListener(moveTo => this.puzzle.movePlayer(moveTo))
    this.model.onAnswer.addListener(answer => this.puzzle.updateAnswer(answer))
    this.model.onUseMove.addListener(remaining => this.puzzle.updateMoves(remaining))

    this.model.onLevel.addListener(model => this.puzzle.render(model))
    this.model.onEnd.addListener(() => this.pages.showEnding())
  }

  run() {
    this.pages.showIntroduction()
    this.puzzle.render(this.model)
  }
}

export default Controller
