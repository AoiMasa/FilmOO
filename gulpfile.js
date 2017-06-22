"use strict";

let gulp = require('gulp');
let ts = require('gulp-typescript');
let spawnSync = require('child_process').spawnSync;
let serverTsProject = ts.createProject('server/tsconfig.json');
let nodemon = require('gulp-nodemon');
let runSequence = require('run-sequence');

//*** MainTask ***

gulp.task('default',['Build-Run-All']);

gulp.task('Build-Run-All',function(){
    runSequence(['Build-Client-PROD','Build-Server-PROD'],'Start-Server-PROD');
});


//*** Client task ***
gulp.task('Build-Client-PROD', (done) => {
    //Build client
    spawnSync('ng', ['build'], { cwd: './client/', stdio: 'inherit', shell: true });
    //Copy client to dist folder
    gulp.src(["./client/dist/*"]).pipe(gulp.dest('./dist'));
});

gulp.task('Client-DEBUG', (done) => {
    //Build client
    spawnSync('ng', ['server'], { cwd: './client/', stdio: 'inherit', shell: true });
});

//*** Server task ***

gulp.task('Build-Server-PROD', () => {
    //Push config
    gulp.src(["./server/config/dev§.json"]).pipe(gulp.dest('./dist/config'));
    gulp.src(["./server/config/default.json"]).pipe(gulp.dest('./dist/config'));
    //Build server and copy it to dist folder
    return serverTsProject.src()
                          .pipe(serverTsProject())
                          .js.pipe(gulp.dest('dist'));
})

gulp.task('Build-Server-TEST', () => {
    spawnSync('tsc', ['-p tsconfig.test.json'], { cwd: './server', stdio: 'inherit', shell: true });
});

gulp.task('Start-Server-PROD', () => {
    spawnSync('node', ['server.js'], { cwd: './dist', stdio: 'inherit', shell: true });
});

gulp.task('Build-and-Start-Server',function(){
    runSequence('Build-Server-PROD','Start-Server-PROD');
});


//Start Node server
//gulp.task('StartAll', function() {
    // configure nodemon
    //nodemon({
        // the script to run the app
        //script: './dist/server.js',
        // this listens to changes in any of these files/routes and restarts the application
        //watch: ["server.js", "app.js", "routes/", 'public/*', 'public/*/**'],
        //ext: 'js'
        // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
    //})

    //on('restart', () => {
    //    gulp.src('server.js')
        // I've added notify, which displays a message on restart. Was more for me to test so you can remove this
    //        .pipe(notify('Running the start tasks and stuff'));
    //});
//});


// By adding this, we can run "gulp watch" to automatically
// run the build when we change a script
//gulp.task('watch', () => {
//    gulp.watch('client/src/**/*', [ 'clientscripts', 'clientResources' ]);
//    gulp.watch('server/src/**/*', [ 'serverscripts' ]);
//});
