/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { player } from '../model/levels'

export default class PuzzleDisplay {
  constructor(levelMap) {
    this.level = levelMap
    this.rows = this.level.length
    this.columns = this.level[0].length
    this.nodes = document.querySelector('.puzzle-container')
    this.setStyleSizes()
  }

  static removeLevel() {
    const node = document.getElementById('puzzle')
    node.querySelectorAll('*').forEach(n => n.remove())
  }

  static movePlayer(playerOn, newSquare) {
    playerOn.classList.toggle('square-with-player')
    newSquare.classList.toggle('square-with-player')
  }

  static togglePlayer(node) {
    node.classList.toggle('square-with-player')
  }

  static toggleLetter(node, letter) {
    node.classList.toggle('square-with-letter')
    node.innerHTML = letter || ''
  }

  static toggleEmpty(node) {
    node.classList.toggle('square-vacant')
  }

  setStyleSizes() {
    this.nodes.style.setProperty('--puzzle-columns', this.columns)
    this.nodes.style.setProperty('--puzzle-rows', this.rows)
  }

  createSquare() {
    const cell = document.createElement('div')
    this.nodes.appendChild(cell).className = `puzzle-square`
    return cell
  }

  render() {
    this.level.flat().forEach(token => {
      const node = this.createSquare()

      if (token === player) {
        PuzzleDisplay.togglePlayer(node)
      } else if (/[A-Z]/g.test(token)) {
        PuzzleDisplay.toggleLetter(node, token)
      } else {
        PuzzleDisplay.toggleEmpty(node)
      }
    })
  }
}
