A demo App for Angular
[Demo URL](http://kingjzhang.github.io/review/)

This review management application allows you to write a review, paginate them and sort them. 
Includes:
- Services 
- Use Local Storage as the persistence
- BDD test

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install dependencies

### Tasks
Here's a list of available tasks:
* `npm run build`
  * runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/bundle.js`. It also prepares `index.html` to be used as application entry point, links assets and created dist version of our application.
* `npm run serve`
  * starts a dev server via `webpack-dev-server`, serving the client folder.
* `npm run watch`
  * alias of `serve`
* `npm start` (which is the default task that runs when typing `gulp` without providing an argument)
  * runs `serve`.
* `npm run component`
  * scaffolds a new Angular component. [Read below](#generating-components) for usage details.
  
### Testing
To run the tests, run `npm test`.
