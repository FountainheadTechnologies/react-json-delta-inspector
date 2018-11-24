# react-json-delta-inspector

Visualize and explore changes to JSON objects generated by `json-delta`, using
`react-inspector`.

[![CircleCI](https://circleci.com/gh/FountainheadTechnologies/react-json-delta-inspector/tree/master.svg?style=svg)](https://circleci.com/gh/FountainheadTechnologies/react-json-delta-inspector/tree/master)

## Installation

For NPM users:

```bash
npm install @fountainhead/react-json-delta-inspector
```

For Yarn users:

```bash
npm install @fountainhead/react-json-delta-inspector
```

## Usage

This package contains a `<DeltaInspector/>` component, which accepts the
following props:

- `prev` (any): The 'previous' state of some Object or Array
- `delta` (Diff[]): The result of calling `jsonDelta.diff` against `prev` and
  another object.

You will notice that `<DeltaInspector />` does *not* accept a `next` object or
attempt to compute a diff between two objects itself; it is on you, as the user
of this package, to provide the previous state and the delta yourself. Since
computing a delta is potentially an expensive operation, you are far more suited
to manage how and when to compute this delta yourself via `jsonDelta.diff`,
rather than us try to optimise it for you.
