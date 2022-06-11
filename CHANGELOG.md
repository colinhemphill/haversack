# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.3] - 2022-06-11

### Changed

- Dependency updates

## [1.2.2] - 2022-05-11

### Changed

- Update all dependencies
- Build system now using [tsup](https://tsup.egoist.sh/)
- Fixed up the project structure a bit

## [1.2.1] - 2021-09-29

### Added

- New tests for SSR behavior
- New tests for versioning
- The `version` can now be a string in addition to a number
  - This is especially useful if you want to hash a data set to invalidate the cache dynamically

### Changed

- Dependency updates

## [1.2.0] - 2021-08-31

### Added

- Add a `version` param which allows you to invalidate the stored values who were using a different version

### Changed

- Dependency updates
  - Upgraded to the latest `husky` which uses git hooks instead of config in the `package.json` file
  - Added React 17.x to valid `peerDependencies`
- Added `eslint-plugin-react-hooks` and updated the plugin bassed on recommendations
  - `useEffect` and `useState` within the hook are not conditional based on `isServerSide()`
- Changed from a `window.onstorage` function to `window.addEventListener`
  - Setup is done in a `useEffect` hook that removes the listener on unmount

## Fixed

- This likely fixes some potential memory leaks from storage listeners and functions returned from the hook

## [1.1.0] - 2020-10-17

### Added

- Add `onstorage` event handler to sync state changes between browser tabs

### Changed

- Update documentation to list bundle size

## [1.0.0] - 2020-10-17

### Added

- Two exported React hooks: `useLocalStorage` and `useSessionStorage`
- TypeScript typings
- Jest and Testing Library test suite

### Changed

- Completely rewritten and repurposed
- This is essentially a brand new library
- Documentation fully updated

## [0.1.0] - 2018-08-29

### Added

- Initial project publish
- Simple functionality includes `setState()`, `clear()`, state retrieval, and `lastUpdated` timestamp

[unreleased]: https://github.com/colinhemphill/haversack/compare/1.0.0...HEAD
[1.0.0]: https://github.com/colinhemphill/haversack/tags/1.0.0
[0.1.0]: https://github.com/colinhemphill/haversack/tags/0.1.0
