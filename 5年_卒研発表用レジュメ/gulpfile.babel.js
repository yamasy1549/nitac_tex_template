'use strict';

import gulp            from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import replace         from 'gulp-replace';
import pug             from 'pug';
import browserSync     from 'browser-sync';

pug.filters.math = function(str, options, locals) {
  return `<p data-math-typeset="true">`
       +   str
       + `</p>`;
}

pug.filters.inmath = function(str, options, locals) {
  return `<span data-math-typeset="true">`
       +   str
       + `</span>`;
}

const $ = gulpLoadPlugins();
const plumberOpt = {
  errorHandler: function(err) {
    console.error(err.stack);
    this.emit('end');
  },
}

gulp.task('default', ['pug', 'assets', 'stylus']);

gulp.task('pug', () =>
  gulp.src(['src/**.pug', '!src/_**.pug'])
    .pipe($.plumber(plumberOpt))
    .pipe($.pug({
      pug: pug,
      pretty: true,
    }))
    .pipe(replace(/、\s*/g, "，"))
    .pipe(replace(/。\s*/g, "．"))
    .pipe(gulp.dest('dest/'))
);

gulp.task('assets', () =>
  gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dest/assets/'))
);

gulp.task('stylus', () =>
  gulp.src(['src/style/main*.styl'])
    .pipe($.plumber(plumberOpt))
    .pipe($.sourcemaps.init())
    .pipe($.stylus({
      'include css': true,
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dest/'))
    .pipe(browserSync.reload({
      stream: true,
    }))
);

gulp.task('browsersync', () => {
  browserSync({
    server: {
      baseDir: 'dest/',
      index: 'index.html',
    },
    open: false,
  });
});

gulp.task('bs-reload', () => {
  browserSync.reload();
})

gulp.task('watch', ['default', 'browsersync'], () => {
  gulp.watch('src/**/*.pug', ['pug']);
  gulp.watch('src/assets/**/*', ['assets']);
  gulp.watch('src/style/**/*.styl', ['stylus']);
  gulp.watch('dest/*.css', ['bs-reload']);
  gulp.watch('dest/*.html', ['bs-reload']);
});
