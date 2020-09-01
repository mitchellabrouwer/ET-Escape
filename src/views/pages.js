/* eslint-disable class-methods-use-this */
export default class Pages {
  showEnding() {
    const pages = document.querySelector('#pages')
    const ending = document.querySelector('#ending')
    pages.style.display = 'block'
    ending.style.display = 'block'
  }

  showBriefing() {
    const pages = document.querySelector('#pages')
    const briefing = document.querySelector('#briefing')
    const button = document.querySelector('#briefing .button')

    pages.style.display = 'block'
    briefing.style.display = 'block'

    button.addEventListener('click', () => {
      pages.style.display = ''
      briefing.style.display = ''
    })

    window.addEventListener('keydown', function enter(event) {
      if (event.key === 'Enter') {
        pages.style.display = ''
        briefing.style.display = ''
        window.removeEventListener('keydown', enter)
      }
    })
  }

  showIntroduction() {
    const pages = document.querySelector('#pages')
    const crash = document.querySelector('#crash')
    const spaceship = document.querySelector('.spaceship')

    pages.style.display = 'block'
    crash.style.display = 'block'

    spaceship.addEventListener(
      'animationend',
      function removeHeight() {
        pages.style.display = ''
        crash.style.display = ''
        this.showBriefing()
        spaceship.removeEventListener('animationend', removeHeight, false)
      }.bind(this),
      false
    )
  }
}
