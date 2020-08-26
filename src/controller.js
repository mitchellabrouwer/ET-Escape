import PuzzleCrossword from './model'
import View from './view'

class Controller {
  constructor() {
    this.model = new PuzzleCrossword()
    this.view = new View()

    this.view.playGameEvent.addListener(move => this.model.play(move))

    this.model.movePlayerEvent.addListener(moveTo =>
      this.view.movePlayer(moveTo)
    )
  }

  run() {
    const { playerAt, levelMap, width, height } = this.model
    this.view.render(playerAt, levelMap, width, height)
  }
}

export default Controller
