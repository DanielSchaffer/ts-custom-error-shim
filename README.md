# ts-custom-error

Extending `Error` does not work completely correctly with TypeScript
[starting with v2.1](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work).

While there isn't a completely function way of fixing this, this utility
seeks at least make unit testing custom errors a little easier. It works
by completely replacing the `Error` object on the global scope. This of
course means that using this on your actual build is likely a terrible
idea, but it will help you test your custom errors.

Note that this is not required for working with plain ES code, since
it works correctly with Node (v8) and most browsers. The problem is
specific to TypeScript.

# Installation

Install from NPM:

```bash
npm install ts-custom-error
```

# Usage

All that is needed for use is to import the package at the beginning of
your tests (before your actual code is imported). Since it replaces the
`Error` class, you do not need to change any of your custom errors to
subclass anything other than `Error`.

**Mocha:**

```bash
mocha --require ts-custom-error src/**/*.spec.ts
```

**Others:**

```typescript
import 'ts-custom-error';
```
