import player from './../assets/images/alien.png'

export default class PuzzleDisplay {
  constructor(levelMap) {
    this.level = levelMap
  }

  static movePlayer(playerOn, newSquare) {
    playerOn.classList.remove('show')
    newSquare.classList.add('show')
  }

  showPlayer(node) {
    node.classList.add('square-active')
    node.firstChild.classList.add('square-with-player', 'player-image', 'show')
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

  createDefaultSquare(nodes) {
    const cell = document.createElement('div')

    cell.appendChild(this.setPlayerImage())
    nodes.appendChild(cell).className = `puzzle-square`
    return nodes.lastChild
  }

  render() {
    const puzzleNodes = document.querySelector('.puzzle-container')
    const rows = this.level.length
    const columns = this.level[0].length

    console.log(puzzleNodes)

    puzzleNodes.style.setProperty('--puzzle-columns', columns)
    puzzleNodes.style.setProperty('--puzzle-rows', rows)

    this.level.flat().forEach((token) => {
      const node = this.createDefaultSquare(puzzleNodes)

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
