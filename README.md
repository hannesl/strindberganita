# strindberganita.se website source files

This is a one-page website with some JS navigation. It is built with
[Gulp](http://gulpjs.com).

## File structure

* **dist/** – This is where the generated website files are stored. *Do not edit
  the HTML or CSS files in this directory!*
* **sass/** – The SASS source files, which are converted to CSS.
* **src/** – The content of the website – `data.yml` contains event data and
  `index.hbs` contains the HTML template for the site.
* **deploy.sh** – The deploy script.
* **gulpfile.js** – The Gulp configuration.
* **package.json** – Defines the NPM packages needed to build this website.

## Installing dependencies

You need [Node](https://nodejs.org) installed. Then you can install the
dependencies by running the following in this directory:

    npm install

For the deploy script to work, you also need to install
[s3cmd](http://s3tools.org/s3cmd).

## Building

Just run `gulp` in this directory. The final web files will end up in `dist/`.
Gulp will keep running and watch for changes as you work on the source files.
When your done, stop it with Ctrl-C.

## Deploying

Run the deploy script in this directory:

    bash deploy.sh
