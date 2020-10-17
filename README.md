# Haversack

[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url]

Easy save state management using browser `localStorage` or `sessionStorage` and React Hooks.

- Written in TypeScript 🎉
- Offers React hooks for both `localStorage` and `sessionStorage` 🎣
- Set simple key/value pairs or an immutable JSON structure
- JSON state merging
- SSR friendly, Next.js compatible
- Small and performant ⚡️

`sessionStorage` is an underrepresented feature as most libraries don't support using either API interchangeably. Storing data to the session is more secure, and is perfectly suitable for many use-cases. Learn about the difference [on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)!

## Installation

Install with NPM or Yarn:

    npm install --save haversack
    yarn add haversack

## Usage With React

Haversack exports the two following React hooks, depending on whether you want to use `localStorage` or `sessionStorage`:

```typescript
import { useLocalStorage, useSessionStorage } from 'haversack';
```

## Get and Set

Each hook returns an object with the current stored value and a function to update the stored value.

### JavaScript

```jsx
function MyComponent() {
  const { value, setValue } = useLocalStorage('myKey');

  useEffect(() => {
    // update the stored value after mount
    setValue('updatedValue');
  }, []);

  return <div>The stored value is {value}</div>;
}
```

### TypeScript

By passing a TypeScript type to the hook, you can enforce a consistent typing for the stored value.

```jsx
function MyComponent() {
  const { value, setValue } = useLocalStorage<string>(
    'myKey',
  );

  useEffect(() => {
    setValue('updatedValue'); // TS is happy 👍
    setValue(5); // TS is unhappy 👎
  }, []);

  return <div>The stored value is {value}</div>;
}
```

## Default Value

You can pass an optional default value to the hook. This value will be returned if `setValue` has not been called yet.

```jsx
function MyComponent() {
  const defaultValue = 'bar';
  const { value } = useLocalStorage('foo', defaultValue);

  return (
    <div>
      The stored value is {value}, but is {defaultValue} by default
    </div>
  );
}
```

_See notes on SSR compatibility for the server-side behavior of the default value._

## Reset the Stored Value

To remove the value from storage, call the `resetValue` function. This will return the value to the default if supplied or `undefined` if not.

```jsx
function MyComponent() {
  const { value, resetValue } = useLocalStorage('myKey');

  return <button onClick={resetValue}>Reset value</button>;
}
```

## Merging State

A unique feature of the library is the ability to manage an immutable store that you can easily merge with updated values.

```jsx
interface Settings {
  name: string;
  currentHp: number;
  spells?: string[];
}

function MyComponent() {
  const {
    value: settings,
    setValue: writeSettings,
    mergeState: updateSettings
  } = useLocalStorage<Settings>(
    'appSettings',
  );

  useEffect(() => {
    // set the initial state
    writeSettings({
      name: 'Jan Darkmagic',
      currentHP: 12,
    });
  }, []);

  const fullRest = () => {
    // will not affect the `name` setting
    updateSettings({
      currentHP: 34, // updates existing field
      spells: ['Burning Hands', 'Charm Person'], // adds new field
    });
  }

  return (
    <>
      <div>User name: {settings.name}</div>
      <button onClick={() => fullRest()}>
        Full rest
      </button>
    </>
  );
}
```

## Timestamps

The hooks always return a `timestamp` of when the stored value was most recently updated as a JavaScript `Date` object.

```jsx
function MyComponent() {
  const { value, timestamp } = useLocalStorage('myKey');

  return (
    <>
      <div>The stored value is {value}</div>
      <div>It was updated at: {timestamp.toString()}</div>
    </>
  );
}
```

## Notes on Server-Side Rendering Compatibility

Obviously browser storage APIs are _not_ functional on the server, and this library is not designed to persist data between the two sources. However, Haversack is built to be friendly with server-side rendered environments including Next.js. If you try to access a stored value on the server, it will return the default value or `undefined` if a default is not specified. You should note that if you are rendering the value as text in a React component, this can throw a warning since the server rendered page will mismatch the hydrated client-side render.

If you need functionality to pass state between client and server, you will need something more complex like [Redux](https://redux.js.org/) state management with the [Redux Persist](https://www.npmjs.com/package/redux-persist) library, or an external database.

## Known Issues

Placing the haversack inside an extradimensional space created by a bag of holding, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/colinhemphill/haversack/blob/master/LICENSE
[npm-downloads-image]: http://img.shields.io/npm/dm/haversack.svg?style=flat-square
[npm-url]: https://npmjs.org/package/haversack
[npm-version-image]: http://img.shields.io/npm/v/haversack.svg?style=flat-square
