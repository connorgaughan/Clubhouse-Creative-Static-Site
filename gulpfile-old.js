var   gulp     = require('gulp'),
      sass         = require('gulp-sass'),
      minifycss    = require('gulp-minify-css'),
      rename       = require('gulp-rename'),
      autoprefixer = require('gulp-autoprefixer'),
      cmq          = require('gulp-combine-media-queries'),
      concat       = require('gulp-concat'),
      uglify       = require('gulp-uglify'),
      imagemin     = require('gulp-imagemin'),
      newer        = require('gulp-newer'),
      clean        = require('gulp-clean'),
      pxtorem      = require('gulp-pxtorem'),
      cp           = require('child_process'),
      browserSync  = require('browser-sync'),
      messages     = {
        jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
      };;

//Set Up Inputs/Outputs
input = {
  'styles':   './_dev/scss/**/*.scss',
  'scripts':  './_dev/js/*.js',
  'images':   './_dev/images/**/*'
}

build = {
  'styles':   './_site/_libs/css/',
  'scripts':  './_site/_libs/js/*.js',
  'images':   './_site/_libs/images/'
}

pxtoremOptions = {
  replace: false
}

postcssOptions = {
  map: true
}

// Build Styles
gulp.task('styles', function() {
  return gulp.src(input.styles)
  .pipe(sass({ errLogToConsole: true }))
  .pipe(sass())
  .pipe(autoprefixer('last 2 version'))
  .pipe(cmq({log: true}))
  .pipe(minifycss())
  .pipe(rename({suffix: '.min'}))
  .pipe(pxtorem(pxtoremOptions, postcssOptions))
  .pipe(gulp.dest(build.styles))
});

// Clean Styles
gulp.task('clean:styles', function(){
  return gulp.src(build.styles)
  .pipe(clean({force: true}))
});

// Build Scripts
gulp.task('scripts', function() {
  return gulp.src(input.scripts)
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(build.scripts))
});

// Clean Scripts
gulp.task('clean:scripts', function(){
  return gulp.src(build.scripts)
  .pipe(clean({force: true}))
});

// Build Images
gulp.task('images', function() {
  return gulp.src(input.images)
  .pipe(newer(build.images))
  .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
  .pipe(gulp.dest(build.images))
});

// Clean images
gulp.task('clean:images', function(){
  return gulp.src(build.images)
  .pipe(clean({force: true}))
});

// Jekyll Build Task
gulp.task('buildJekyll', shell.task([ 'jekyll build' ]));

// Serve Jekyll Task
gulp.task('jekyll', function () {
     require('child_process').spawn('jekyll', ['serve','-w'], {stdio: 'inherit'});
});

// Clean Start Task
gulp.task('clean', ['clean:styles', 'clean:scripts', 'clean:images', 'styles', 'scripts', 'images'], shell.task([ 'jekyll build' ]));

// Watch and rebuild on change
gulp.task('default', ['jekyll', 'styles', 'scripts', 'images'], function() {

    gulp.watch([
      '_includes/**/*.html',
      '_layouts/**/*.html',
      '_posts/**/*',
      'index.html',
      '*.md'
    ], ['buildJekyll']);

    gulp.watch(input.styles, ['styles', 'buildJekyll']);
    gulp.watch(input.scripts, ['scripts', 'buildJekyll']);
    gulp.watch(input.images, ['images', 'buildJekyll']);

});