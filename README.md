# Haversack

Easy save state management stored in the browser's LocalStorage. Works just like states in React.

## Installation

    npm install --save haversack

## How To Use

### Setup

```javascript
// ES6
import Haversack from 'haversack'

// CommonJS
// Haversack = require('haversack')

const haversack = new Haversack({
  prefix: 'yourProject'
})
```

#### Options

-   `prefix`: String, optional, defaults to `'haversack'`
-   `includeTimestamps`: Boolean, optional, defaults to `true`

### Updating State

Haversack is modeled after state management in React. To put items in the bag, run the `setState()` command with an object containing the items you want to update.

```javascript
haversack.setState({
  name: 'Jan Darkmagic',
  currentHp: 34,
  items: ['Driftglobe', 'Potion of Healing', 'Immovable Rod']
})
```

Later updates will only affect the parameters that you explicitly set.

```javascript
haversack.setState({
  currentHp: 28
})
```

The above will update `currentHp` but will not overwrite the state of the other parameters.

### Retrieving State

To pull an item out of the bag, access it on `haversack.state`.

```javascript
console.log(haversack.state.currentHp)
// 28

console.log(haversack.state.name)
// 'Jan Darkmagic'
```

### Clearing State

To empty out the bag, call `haversack.clear()`.

```javascript
console.log(haversack.state.currentHp)
// 28

haversack.clear()
console.log(haversack.state.currentHp)
// undefined
```

### Timestamps

If the `includeTimestamps` option is enabled, all calls to `update()` will leave a timestamp that you can access.

```javascript
console.log(haversack.lastUpdated)
// Wed Aug 29 2018 16:29:42 GMT-0500 (Central Daylight Time)
```

## Known Issues

Placing the haversack inside an extradimensional space created by a bag of holding, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.
