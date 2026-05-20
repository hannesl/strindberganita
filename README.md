# strindberganita.se website source files

This is a one-page website with some JS navigation. It is built with
[Gulp](http://gulpjs.com).

## File structure

- **dist/** – This is where the generated website files are stored. _Do not
  edit the HTML or CSS files in this directory!_
- **sass/** – The SASS source files, which are converted to CSS.
- **src/** – The content of the website – `data.yml` contains event data and
  `index.hbs` contains the HTML template for the site.
- **deploy.sh** – The deploy script.
- **gulpfile.js** – The Gulp configuration.
- **package.json** – Defines the NPM packages needed to build this website.

## Installing dependencies

You need [Node](https://nodejs.org) installed. Then you can install the
dependencies by running the following in this directory:

    yarn install

## Building

Just run local gulp in this directory:

    ./node_modules/.bin/gulp

The final web files will end up in `dist/`.
Gulp will keep running and watch for changes as you work on the source files.
When your done, stop it with Ctrl-C.

## Deploying

Push to GitHub and let the [workflow](.github/workflows/deploy.yml) deploy `dist` to the `gh-pages` branch.
