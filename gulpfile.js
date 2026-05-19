var gulp = require("gulp");
var yaml = require("js-yaml");
var handlebars = require("gulp-compile-handlebars");
var rename = require("gulp-rename");
var fs = require("fs");
var moment = require("moment");
var sass = require("gulp-sass")(require("sass"));
var compass = require("compass-importer");

moment.locale("sv");

gulp.task("template", function () {
  var templateData = yaml.load(fs.readFileSync("src/data.yml", "utf-8"));

  var processEvent = function (event) {
    event.dates = event.dates.map(function (date) {
      date.formatted = moment(date.date).format("dddd D MMMM");
      return date;
    });
    return event;
  };

  templateData.walks = templateData.walks
    ? templateData.walks.map(processEvent)
    : [];
  templateData.excursions = templateData.excursions
    ? templateData.excursions.map(processEvent)
    : [];

  return gulp
    .src("src/index.hbs")
    .pipe(handlebars(templateData))
    .pipe(rename("index.html"))
    .pipe(gulp.dest("dist"));
});

gulp.task("sass", function () {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(sass({ importer: compass }).on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("watch", function () {
  gulp.watch("src/*", gulp.series("template"));
  gulp.watch("sass/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.series(gulp.parallel("template", "sass"), "watch"));
