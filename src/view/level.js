import player from './../assets/images/alien.png'

const puzzleGridDisplay = document.querySelector('.grid-container')

export default class Level {
  constructor(levelMap) {
    this.level = levelMap
  }

  showPlayer(node) {
    node.firstChild.classList.add('square-with-player', 'player-image', 'active')
  }

  setLetter(node, letter) {
    const element = document.createElement(`p`)

    element.innerText = letter
    node.classList.add('square-with-letter')
    node.appendChild(element)
  }

  setEmpty(node) {
    node.classList.add('square-vacant')
  }

  setPlayerImage() {
    const hiddenImage = document.createElement('img')

    hiddenImage.src = player
    hiddenImage.classList.add('player-image')
    return hiddenImage
  }

  createDefaultSquare() {
    const cell = document.createElement('div')

    cell.appendChild(this.setPlayerImage())
    puzzleGridDisplay.appendChild(cell).className = `grid-item`
    return puzzleGridDisplay.lastChild
  }

  render() {
    const rows = this.level.length
    const columns = this.level[0].length

    puzzleGridDisplay.style.setProperty('--grid-columns', columns)
    puzzleGridDisplay.style.setProperty('--grid-rows', rows)

    this.level.flat().forEach((token) => {
      const node = this.createDefaultSquare()

      if (token === player) {
        this.showPlayer(node)
      } else if (/[A-Z]/g.test(token)) {
        this.setLetter(node, token)
      } else {
        this.setEmpty(node)
      }
    })
  }
}
