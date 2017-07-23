var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    prefix      = require('gulp-autoprefixer'),
    sass        = require('gulp-sass'),
    cp          = require('child_process'),
    ghPages     = require('gulp-gh-pages');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('_scss/*.scss')
        .pipe(sass({
            includePaths: ['_scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch('_scss/**/*.scss', ['sass', 'jekyll-build']);
    gulp.watch('js/**/*.js', ['jekyll-rebuild']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*', 'about/*', 'blog/*', 'resume/*'], ['jekyll-rebuild']);
});

gulp.task('deploy', function() {
  return gulp.src('./_site/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['browser-sync', 'watch']);
