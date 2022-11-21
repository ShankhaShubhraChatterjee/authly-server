const gulp = require("gulp");
const pugLint = require("gulp-pug-lint");
const stylishReporter = require("puglint-stylish");

function lintPug() {
    return gulp
            .src("src/client/views/**/*.pug")
            .pipe(pugLint({ reporter: stylishReporter }))
}
exports.lint = lintPug;
