## Getting Started
[How to Contribute](#how-to-contribute-back) • [Code Styles](#coding-styles) • [Testing](#testing)

## How to Contribute Back
We follow the [open source workflow](https://guides.github.com/activities/contributing-to-open-source/) when contributing to the codebase. The basic instructions are:

1. Create an issue
2. Fork the repository
3. Create a new branch in your fork
4. Add your code with it's appropriate tests
5. Ensure that all tests pass and that you have properly follow all our guidelines below.
6. Push to your fork and then open a pull request to **our** repository's master branch.
7. Keep your branch up to date with any changes that may go into master before yours until it is merge.

It takes one maintainer to approve your code to merge it in, unless it's a large change to core functionality, our distribution workflow, or code styling changes, all which will require all our maintainers to approve the code.

### Timeframe
We understand your time is valuable and that you are creating this pull request because you want this functionality delivered as soon as possible. You can expect us to start commenting on your pull request within 3 hours of each change or comment during our normal working hours, Mon-Fri 8am-5pm CST. Ping us on our review slack channel `#hapi-starter-kit` mentioning `@starter-kit-devs` if you do not hear from us within that time, or if your PR is urgent and needs eyes on it as quickly as possible.

## Coding Styles
[Versioning](#versioning) • [ES6 Syntax](#es6-syntax) • [CSS Selectors](#css-selectors) • [Linting](#linting)

### Versioning
At the moment we are controlling our version number manually. With every pull request you need to change the version number appropriately following our [simplified semserve definition](/README.md#versioning)

### ES6 Syntax
We prefer to use the ES6 syntax with the `import` format for listing dependencies.

### CSS selectors
We prefer the use of class selectors vs id and tag selectors. While we allow the use of id and tag selectors in our linting rules we encourage you not to use them as classnames are faster and are not dictating node structure and types.

### Linting
We must follow all our linting rules, if you feel like your code needs an exception please be prepared to explain why. The one general exception is the `no-unused-vars` with importing React at the top of our components. In that case use this code

```javascript
import React from 'react'; // eslint-disable-line no-unused-vars
```

Linting is included within the `npm test` command, but you can also just check for linting errors by running the following command.

`npm run lint`

We are linting the following:

- **Javascript** (`gulp eslint-js`) using [eslint](http://eslint.org/). Our configuration for all javascript is found at [.eslintrc](/.eslintrc). The documentation for all the rules can be found on their [documentation site](http://eslint.org/docs/rules/).
- **SCSS** (`gulp scsslint`) using [sasslint](https://github.com/sasstools/sass-lint). Our configuration is found at [.sass-lint.yml](/.sass-lint.yml) and the documentation for all the rules can be found in their [github repo](https://github.com/sasstools/sass-lint/tree/develop/docs/rules).
- **JSON** (`gulp htmllint`) using [jsonlint](https://github.com/rogeriopvl/jsonlint). No config, it just mimicks http://jsonlint.com/
- **Package** (`gulp packagelint`) using [packagelint](https://github.com/chmontgomery/gulp-nice-package). No config as it is an opinionated json linter.


```javascript
/**
It will run package lint, eslint, scss lint, compile
our css from our scss files, html lint, and json lint
**/
npm run lint
```

#### Linting Rules
We must follow all our linting rules, if you feel like your code needs an exception please be prepared to explain why. The one general exception is the `no-unused-vars` with importing React at the top of our components. In that case use this code

```javascript
import React from 'react'; // eslint-disable-line no-unused-vars
```

## Testing
[Pre-reqs](#testing-prerequisities) • [Run Tests](#how-to-run-test) • [Code Coverage](#code-coverage) • [Test runners and assertion syntax](#test-runners-and-assertion-syntax) • [Inverse Assertions Too](#inverse-assertions-too)

### Testing Prerequisities
We use [karma](https://karma-runner.github.io/1.0/index.html) to create our testing environment for our browser tests. The default browsers to test are:

- [Firefox](https://www.mozilla.org/en-US/firefox/new/) This needs to be the commercial version, **NOT the IBM customized solution** (needs to be installed independently)
- [Chrome](https://www.google.com/chrome/browser/desktop/index.html) (needs to be installed independently)

### How to run test
```
// To run all tests and linting checks
npm test;

// To run all browser tests
npm run test:browser;

// To run all unit tests
npm run test:unit
```

### Code Coverage
Our code's testing requires 100% test coverage before we can merge and distribute our files to production. We combine both unit-test and browser test for our code coverage report, so the same component can be tested partially by both. As long as the sum of the tests equal 100% then we are good to go. You can view html reports of code coverage in `/coverage/combined`.

### Test runners and assertion syntax
Both browser and unit tests use [mocha](https://mochajs.org/) as their test runner and [chai's](http://chaijs.com/guide/styles/#expect) `expect` assertion library. We also have [sinonjs](http://sinonjs.org/) in the project if you need it. You can run the combine command with `npm run test:coverage`;

### Inverse Assertions Too
We also encourage the use of inverse assertions. Basically we have two tests and assertions for each condition.
```javascript
describe('The component', () => {
    it('does something when conditions are right', () => {...});
    it('does not do something when conditions are wrong', () => {...});
});
```