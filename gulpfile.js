const {
    series,
    src,
    dest,
    watch
} = require('gulp');

const htmlClean = require('gulp-htmlclean');

const less = require('gulp-less');
const cssClean = require('gulp-clean-css');

const stripeDebug = require('gulp-strip-debug');
const uglifyEs = require('gulp-uglify-es').default;

const imageMin = require('gulp-imagemin');

const connect = require('gulp-connect');
const {
    reload
} = require('gulp-connect');

const folder = {
    src: 'src/',
    dist: 'dist/'
}

function html() {
    return src(folder.src + 'html/*')
        .pipe(htmlClean())
        .pipe(dest(folder.dist + 'html/'))
        .pipe(reload());
}
// 先处理less为css->压缩css
function css(cb) {
    return src(folder.src + 'css/*')
        .pipe(less())
        .pipe(cssClean())
        .pipe(dest(folder.dist + 'css/'))
        .pipe(reload());
    cb();
}

function js(cb) {
    return src(folder.src + 'js/*')
        .pipe(stripeDebug())
        .pipe(uglifyEs())
        .pipe(dest(folder.dist + 'js/'))
        .pipe(reload());
    cb();
}

function image(cb) {
    return src(folder.src + 'images/*')
        .pipe(imageMin())
        .pipe(dest(folder.dist + 'images/'));
    cb();
}

// 开启服务器，监听文件变化
function server() { //导入connect，写入server任务
    connect.server({
        port: '1573',
        livereload: true //自动刷新
    });
}
watch(folder.src + 'html/', function (cb) {
    html();
    cb();
})
watch(folder.src + 'css/', function (cb) {
    css();
    cb();
})
watch(folder.src + 'js/', function (cb) {
    js();
    cb();
})
exports.default = series(html, css, js, image, server);