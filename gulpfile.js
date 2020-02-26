var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


function css_style(done) {
    gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade: false
  }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.stream());

  done();
  }
 

  function watchFiles() {
    gulp.watch("app/scss/**/*", css_style);
    gulp.watch("app/**/*.html", browserReload);
    
  }

  function sync(done) {
    browserSync.init({
      server: {
        baseDir: "app/"
      },
      port: 3000
    });
    done();
  }

  function browserReload(done) {
    browserSync.reload();
    done();
  }
  
  exports.default = gulp.parallel(sync,watchFiles);
  exports.sync = sync; 