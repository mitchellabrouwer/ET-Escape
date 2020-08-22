/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import player from '../assets/images/alien.png'

export default class PuzzleDisplay {
  constructor(levelMap) {
    this.level = levelMap
    this.rows = this.level.length
    this.columns = this.level[0].length
    this.nodes = document.querySelector('.puzzle-container')
    this.setStyleSizes()
  }

  static movePlayer(playerOn, newSquare) {
    playerOn.classList.remove('show')
    newSquare.classList.add('show')
  }

  setStyleSizes() {
    this.nodes.style.setProperty('--puzzle-columns', this.columns)
    this.nodes.style.setProperty('--puzzle-rows', this.rows)
  }

  showPlayer(node) {
    node.classList.add('square-with-player')
  }

  setLetter(node, letter) {
    node.classList.add('square-with-letter')
    node.innerHTML = letter
  }

  setEmpty(node) {
    node.classList.add('square-vacant')
  }

  createSquare() {
    const cell = document.createElement('div')
    this.nodes.appendChild(cell).className = `puzzle-square`
    return cell
  }

  render() {
    this.level.flat().forEach((token) => {
      const node = this.createSquare()

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
