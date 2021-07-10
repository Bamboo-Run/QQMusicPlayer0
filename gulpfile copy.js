const gulp = require('gulp');
const terser = require('gulp-terser');
var rename = require("gulp-rename");

// *1.输入目录和输出目录的处理
const {
    src,
    dest
} = require("gulp");

function as() {
    return src("src/js/*.js")
        .pipe(dest("dist/js"))
        .pipe(terser())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest("dist/js"));
}
exports.default = as;

// *2.文件监控
const {
    watch
} = require('gulp');
watch('./css/*', {
    delay: 3000
}, function (cb) {
    console.log('the project is under watched.');
    cb();
});