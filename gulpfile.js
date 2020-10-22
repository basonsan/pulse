const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const sass          = require('gulp-sass');
const cleanCSS      = require('gulp-clean-css');
const autoprefixer  = require('gulp-autoprefixer');
const rename        = require("gulp-rename");
const imagemin      = require('gulp-imagemin');
const htmlmin       = require('gulp-htmlmin');

gulp.task('server', function() { //запускаем лайв сервер

    browserSync({
        server: {
            baseDir: "dist"  //указываем путь где лежит index.html
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload); //отслеживаем все html файлы и обновляем страницу
});

gulp.task('styles', function() { //настраиваем компиляцию препроцессоров
    return gulp.src("src/sass/**/*.+(scss|sass)")   //указываем где лежат файлы препроцессора
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))     //выбираем стиль компиляции
        .pipe(rename({suffix: '.min', prefix: ''})) //добавить суфикс .min к названию файла
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))     //указываем где сохранить файл после компиляции
        .pipe(browserSync.stream());    //обновляем страницу после компиляции
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));  //отслеживать изменения в папке препроцессоров и запускать компиляцию
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true })) //компилируем файл html
        .pipe(gulp.dest('dist/'));   //сохраняем скомпилированный файл в папку distr
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*js")
        .pipe(gulp.dest('dist/js'));   //сохраняем файлs в папку distr
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest('dist/fonts'));   //сохраняем файлs в папку distr
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest('dist/icons'));   //сохраняем файлs в папку distr
});

gulp.task('img', function() {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));   //сохраняем файлs в папку distr
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'img'));   //запускаем задачи