# Starter-kit
Hapi.js, React.js, CouchDB starter-kit

## Contributing
Checkout out our [contributing guide](CONTRIBUTING.md)

### Global Prerequisites

 - [Node.JS 6.9.x+ and NPM](https://nodejs.org/en/)

## Usage
 * Clone Starter-kit to desired dir
    ```
    git clone https://github.ibm.com/dfrsol/starter-kit;
    cd starter-kit;
    ```

 * Install all required dependencies
    ```
    npm install;
    ```

 * To develop within the project
    ```
    npm run dev;
    ```
    This will turning on webpack hot module reloading and scss watch tasks that will automatic restart the server and build all the files for you upon any change made.

 * Open up your browser and go to `http://localhost:8000/`

 * To build production files
    ```
    npm run build;
    ```

## Project structure
```
assets/
├── styles/
│   ├── card.js
│   └── main.js
├── js/
|   ├── components/
|   ├── reducers/
|   ├── actions.js
|   ├── app.js
│   └── store.js
configs/
├── general.js
├── karma.js
├── webpack.client-watch.js
├── webpack.client.js
├── webpack.server-watch.js
└── webpack.server.js
gulp-tasks/
├── browser-tests.js
├── deploy.js
├── eslint-js.js
├── jsonlint.js
├── lobster.js
├── packagelint.js
├── scss.js
└── scsslint.js
lib/
├── handlers/
|   ├── api.js
│   └── landingpage.js
├── plugins
|   ├── db.js
|   └── goodconfig.js
├── routes/
|   ├── api.js
│   └── landingpage.js
├── utils/
|   └── helpers.js
├── templates/
|   ├── helpers/
|   ├── layouts/
|   |   └── default.hbs
|   ├── partials/
|   |   ├── header.hbs
|   |   ├── leadspace.hbs
|   |   ├── footer.hbs
|   |   └── head.hbs
│   └── index.hbs
├── index.js
└── start.js
test/
├── assets/
|   ├── components
│   |     └── card_spec.js
|   ├── reducers
│   |     └── app_spec.js
|   ├── actions_spec.js
|   └── app_browser.js
├── fixtures/
│   └── students.js
└── lib/
   ├── handlers/
   |   ├── api_spec.js
   |   └── landingpage_spec.js
   ├── plugins/
   |   └── goodconfig_spec.js
   ├── routes/
   |   ├── api_spec.js
   |   └── landingpage_spec.js
   └── index_spec.js
index.js
package.json
```

#### Example State Architecture
```js
{
    filters: {
        dateRange: {start, stop},
        owner,
        completionPercentage,
        searchTerms
    },
    admin: true,
    goals: [goalIDs, ...]
    goalsById: {goalId: {}, ...}
}
```
#### assets
Folder to hold any static files to be served to the client and/or other misc files needed.

##### js
Where the client-side javascript files are stored

##### styles
Where we keep the `.scss` files. They will be compiled with the command `npm run build:scss`, they will also build with `npm run build`, `npm run watch`, `npm run watch:scss`, and `gulp scss`;

#### configs
This is where we place any configuration file that is not a `.notation` (e.g., `.bablerc`, `.eslintrc.js`, `.npmrc`, , `.sass-lint.yml`, `.travis.yml`'). So configurations for `karma`, `webpack`, and general configurations for the server like port number, uri, and gulp blobbing rules for file types are all found here.

#### gulp-tasks
We use `gulp-task-loader` to automatic load any file in the folder as gulp tasks.  We started the convention that most of the gulp command should also have a common documented in the `package.json` so that you can run it throu the `npm` interface as well.

#### lib
Where server side code resides.

##### routes
Application routing is organized into logical Hapi.js plugins that are stored within the routes folder [routes](lib/routes).

##### handlers
Handlers (sometimes called controllers) are functions that accept two parameters: `request` and `reply`.

The `request` parameter is an object with details about the end user's request, such as path parameters, an associated payload, authentication information, headers, etc.

The second parameter, `reply`, is the method used to respond to the request.

Here's an example of a simple handler:

```js
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        return reply('Hello!');
    }
});
```

The above handler is defined inline, but most of the handlers in this project are defined in their own file in the [handlers](lib/handlers) directory.

#### Custom Plugins
- [db](lib/plugins/db.js) | Fetches  data from our local CouchDB database or in production the Cloudant database.
- [goodConfig](lib/plugins/goodConfig.js) | Sets up application logging utilizing [Good](https://github.com/hapijs/good/blob/master/API.md), offWorld, [Good-squeeze](https://github.com/hapijs/good-squeeze), and [Good-console](https://github.com/hapijs/good-console)

#### test
Where our unit test and browser tests are housed, they should match up 1 to 1 to all the other folders and files. The only deviation to this pattern is with testing our handlers, in some cases handlers need to be tested with different data sets `mockPage_data1_spec.js` and `mockPage_data2_spec.js`. We use `mocha` as our test runner, `chai/expect` as our assertion library, and `karma` as our browser testing environment.

## Packages Docs

### Hapi
- [Hapi](https://github.com/hapijs/hapi/blob/master/API.md) | Server Framework
- [Good](https://github.com/hapijs/good/blob/master/API.md) | Logger
- [Inert](https://github.com/hapijs/inert/blob/master/README.md) | Static file and directory handler
- [Vision](https://github.com/hapijs/vision/blob/master/README.md) | Templates rendering plugin
- [Boom](https://github.com/hapijs/boom) | Plugin that provides a set of utilities for returning HTTP errors.

### Database
- [Bluemix Cloudant](https://console.ng.bluemix.net/catalog/cloudant-nosql-db)
- [PouchDB](https://pouchdb.com/)
- [CouchDB](http://couchdb.apache.org/)

### Tests
- [Mocha](https://mochajs.org/)
- [Chai](http://chaijs.com/api/bdd/)
- [Karma](https://karma-runner.github.io/1.0/index.html)
- [Sinon](http://sinonjs.org/)
- [Enzyme](https://github.com/airbnb/enzyme)

### Utils
- [Hoek](https://github.com/hapijs/hoek/blob/master/README.md) | Utility methods for the hapi ecosystem
- [Joi](https://github.com/hapijs/joi/blob/master/README.md) | Object schema description language and validator for JavaScript objects.
- [Webpack](https://github.com/webpack/webpack) | A bundler for javascript and friends. Packs many modules into a few bundled assets.
- [Babel](https://github.com/babel/babel) | A compiler for writing next generation JavaScript
- [Gulp](https://github.com/gulpjs/gulp) | A streaming build system

## Versioning
We follow a simplified form of semserve:

- Breaking Change => **Major**
- Dist New Functionality => **Minor**
- Bug Fix/Enhancement => **Patch**
