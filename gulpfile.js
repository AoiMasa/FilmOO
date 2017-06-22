"use strict";

let gulp = require('gulp');
let gulpsync = require('gulp-sync')(gulp);
let ts = require('gulp-typescript');
let spawnSync = require('child_process').spawnSync;
let serverTsProject = ts.createProject('server/tsconfig.json');
let nodemon = require('gulp-nodemon');

//*** MainTask ***
gulp.task('build',gulpsync.async(['Serverscripts','Clientscripts']));

gulp.task('default',['build']);

//*** Client task ***
gulp.task('Clientscripts', (done) => {
    //Build client
    spawnSync('ng', ['build'], { cwd: './client/', stdio: 'inherit', shell: true });
    //Copy client to dist folder
    gulp.src(["./client/dist/*"]).pipe(gulp.dest('./dist'));
});

gulp.task('Clientscripts - Debug', (done) => {
    //Build client
    spawnSync('ng', ['server'], { cwd: './client/', stdio: 'inherit', shell: true });
});

//*** Server task ***
gulp.task('Serverscripts', () => {
    //Build server and copy it to dist folder
    return serverTsProject.src()
                          .pipe(serverTsProject())
                          .js
                          .pipe(gulp.dest('dist'));
})





//Start Node server
gulp.task('StartAll', function() {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: './dist/server.js',
        // this listens to changes in any of these files/routes and restarts the application
        //watch: ["server.js", "app.js", "routes/", 'public/*', 'public/*/**'],
        ext: 'js'
        // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
    })

    //on('restart', () => {
    //    gulp.src('server.js')
        // I've added notify, which displays a message on restart. Was more for me to test so you can remove this
    //        .pipe(notify('Running the start tasks and stuff'));
    //});
});


// By adding this, we can run "gulp watch" to automatically
// run the build when we change a script
//gulp.task('watch', () => {
//    gulp.watch('client/src/**/*', [ 'clientscripts', 'clientResources' ]);
//    gulp.watch('server/src/**/*', [ 'serverscripts' ]);
//});
