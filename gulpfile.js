"use strict";

let gulp = require('gulp');
let ts = require('gulp-typescript');

let serverTsProject = ts.createProject('server/tsconfig.json');

//*** MainTask ***
gulp.task('Default', [
    'Clientscripts',
    'Serverscripts',
    'Start'
]);


//*** Client task ***
var spawn = require('child_process').spawn;

gulp.task('Clientscripts', (done) => {
    //Build client
    spawn('ng', ['build'], { cwd: './client/', stdio: 'inherit' }).on('close', done);

    //Copie client to dist folder
    gulp.src(["./client/dist/*"]).pipe(gulp.dest('./dist'));
});

gulp.task('Clientscripts - Debug', (done) => {
    //Build client
    spawn('ng', ['server'], { cwd: './client/', stdio: 'inherit' }).on('close', done);
});

//*** Server task ***
gulp.task('Serverscripts', () => {
    //Build server and copy it to dist folder
    return serverTsProject.src()
                        .pipe(serverTsProject())
                        .js
                        .pipe(gulp.dest('dist'));
})


var nodemon = require('gulp-nodemon')


//Start Node server
gulp.task('Start', function() {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: './dist/server.js',
        // this listens to changes in any of these files/routes and restarts the application
        //watch: ["server.js", "app.js", "routes/", 'public/*', 'public/*/**'],
        ext: 'js'
        // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
    }).on('restart', () => {
        gulp.src('server.js')
        // I've added notify, which displays a message on restart. Was more for me to test so you can remove this
            .pipe(notify('Running the start tasks and stuff'));
    });
});


// By adding this, we can run "gulp watch" to automatically
// run the build when we change a script
//gulp.task('watch', () => {
//    gulp.watch('client/src/**/*', [ 'clientscripts', 'clientResources' ]);
//    gulp.watch('server/src/**/*', [ 'serverscripts' ]);
//});
