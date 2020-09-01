/* eslint-disable class-methods-use-this */
export default class Modal {
  open({ header, message, button }) {
    const modal = document.querySelector('#modal')
    const close = document.querySelector('#modal button')
    const heading = document.querySelector('.modal-header')
    const content = document.querySelector('.modal-text')

    heading.textContent = header
    content.textContent = message
    close.textContent = button
    modal.style.display = 'block'

    close.onclick = function closeButton() {
      modal.style.display = 'none'
    }

    window.onclick = function clickOutside(event) {
      if (event.target === modal) {
        modal.style.display = 'none'
      }
    }

    window.addEventListener('keydown', function enterKey(event) {
      if (event.key === 'Enter') {
        modal.style.display = 'none'
        window.removeEventListener('keydown', enterKey)
      }
    })
  }
}
