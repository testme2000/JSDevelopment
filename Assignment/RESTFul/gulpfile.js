var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        extension: 'js',
        env: {
            PORT : 8000
        },
        ignore: ['./node_modules/**']
    });
}).on('restart', function() {
    console.log('Gulp task restarted and watching');
})
