/* eslint-disable class-methods-use-this */
export default class Grid {
  constructor(levelMap, playerAt, width, height) {
    this.levelMap = levelMap
    this.playerAt = playerAt

    this.root = document.querySelector('#puzzle')
    this.squareNodes = this.root.childNodes

    this.setCssVariables(width, height)
  }

  setCssVariables(width, height) {
    this.root.style.setProperty('--puzzle-columns', width)
    this.root.style.setProperty('--puzzle-rows', height)
  }

  togglePlayer(node) {
    node.classList.toggle('square-with-player')
  }

  toggleLetter(node, letter) {
    let span = node.querySelector('span')

    if (span === null) {
      span = document.createElement('span')
      span.textContent = letter
      node.appendChild(span)
      node.classList.toggle('square-with-letter')
    }

    span.classList.toggle('show')
  }

  toggleEmpty(node) {
    node.classList.toggle('square-vacant')
  }

  render(onMove) {
    console.log(onMove)
    this.levelMap.forEach((token, i) => {
      const cell = document.createElement('div')

      cell.addEventListener('click', () => onMove.trigger({ index: i }))

      this.root.appendChild(cell).className = `puzzle-square`

      if (this.playerAt === i) {
        this.togglePlayer(this.squareNodes[i])
      } else if (/^[A-Za-z]$/g.test(token)) {
        this.toggleLetter(this.squareNodes[i], token)
      } else {
        this.toggleEmpty(this.squareNodes[i])
      }
    })
  }
}

/* eslint-disable class-methods-use-this */
