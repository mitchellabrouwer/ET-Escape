class Event {
  constructor() {
    this.listeners = []
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  trigger(parameters) {
    this.listeners.forEach(listener => listener(parameters))
  }
}

export default Event
