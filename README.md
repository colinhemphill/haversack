# Haversack

[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url]

Easy save state management using browser `localStorage` or `sessionStorage`.

- Written in TypeScript
- Ships with React hooks and

## Installation

    npm install --save haversack

## How To Use

### With React Hooks

While Haversack is usable in any browser environment, it is perhaps most useful as a React hooks library. Haversack exports the two following React hooks, depending on whether you want to use `localStorage` or `sessionStorage`:

```jsx
import { useLocalStorage, useSessionStorage } from 'haversack';

function MyComponent() {
  const { value, timestamp } = useLocalStorage('myKey', 'defaultValue');

  return (
    <>
      <div>The stored value is {value}</div>
      {timestamp && <div>Last updated: {timestamp.toString()}</div>}
    </>
  );
}
```

## Known Issues

Placing the haversack inside an extradimensional space created by a bag of holding, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/colinhemphill/haversack/blob/master/LICENSE
[npm-downloads-image]: http://img.shields.io/npm/dm/haversack.svg?style=flat-square
[npm-url]: https://npmjs.org/package/haversack
[npm-version-image]: http://img.shields.io/npm/v/haversack.svg?style=flat-square
