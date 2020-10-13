const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function() { //запускаем лайв сервер

    browserSync({
        server: {
            baseDir: "src"  //указываем путь где лежит index.html
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
        .pipe(gulp.dest("src/css"))     //указываем где сохранить файл после компиляции
        .pipe(browserSync.stream());    //обновляем страницу после компиляции
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));  //отслеживать изменения в папке препроцессоров и запускать компиляцию
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));   //запускаем задачи