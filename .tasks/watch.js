'use strict';
var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    format = require("string-format"),
    watch = require("gulp-watch"),
    spsave = require("gulp-spsave"),
    runSequence = require("run-sequence"),
    livereload = require('gulp-livereload'),
    configuration = require('./@configuration.js'),
    settings = require('./@settings.js');

let buildTimeout;

function __startWatch(packageCodeFunc) {
    livereload.listen({ start: true });
    watch(configuration.PATHS.sourceGlob).on("change", () => {
        if (buildTimeout) {
            clearTimeout(buildTimeout);
        }
        buildTimeout = setTimeout(() => {
            runSequence("clean", packageCodeFunc, () => {
                uploadFile(format("{0}/js/*.js", configuration.PATHS.DIST), settings.siteUrl, "siteassets/pp/js")
            })
        }, 100);
    });
    watch(configuration.PATHS.stylesGlob).on("change", () => {
        runSequence("packageStyles", () => {
            uploadFile(format("{0}/css/*.css", configuration.PATHS.DIST), settings.siteUrl, "siteassets/pp/css")
        })
    });
}

gulp.task("watch", () => {
    __startWatch("packageCode");
});

gulp.task("watchProd", () => {
    __startWatch("packageCodeMinify");
});

function uploadFile(glob, url, folder) {
    gulp.src(glob)
        .pipe(plumber({
            errorHandler: function (err) {
                this.emit("end");
            }
        }))
        .pipe(spsave({ folder: folder, siteUrl: url }, { username: settings.username, password: settings.password }))
        .pipe(livereload());
}