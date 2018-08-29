class Haversack {

  // CONSTRUCTOR
  constructor(config) {
    this.config = Object.assign({
      prefix: 'haversack',
      includeTimestamps: true
    }, config)

    this.storageKey = `${this.config.prefix}-state`

    let existingState = localStorage.getItem(this.storageKey)

    try {
      existingState = JSON.parse(existingState)
    } catch(err) {}

    const newState = existingState ? existingState : {}
    this._state = existingState !== null ? existingState : {}
  }

  // GETTERS & SETTERS
  get state() {
    return this._state
  }

  set state(stateUpdates) {
    throw new Error('Cannot directly set Haversack state. Please call haversack.update() instead.')
  }

  get lastUpdated() {
    return this._lastUpdated
  }

  set lastUpdated(newTimestamp) {
    if(newTimestamp instanceof Date) {
      this._lastUpdated = newTimestamp
    } else {
      throw new Error('Invalid lastUpdated assignment to Haversack.')
    }
  }

  // METHODS
  setState(stateUpdates) {
    let currentState = this._state
    if(!currentState) {
      currentState = {}
    }

    const newState = Object.assign(currentState, stateUpdates)

    if(this.config.includeTimestamps) {
      this._lastUpdated = new Date()
    }

    localStorage.setItem(this.storageKey, JSON.stringify(newState))
    this._state = newState
  }

  clear() {
    const emptyState = {}
    localStorage.setItem(this.storageKey, JSON.stringify(emptyState))
    this._state = emptyState
  }
}

module.exports = Haversack
