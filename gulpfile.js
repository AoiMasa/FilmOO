"use strict";

let gulp = require('gulp');
let ts = require('gulp-typescript');

// let clientTsProject = ts.createProject('client/tsconfig.json');
let serverTsProject = ts.createProject('server/tsconfig.json');

// These tasks will be run when you just type "gulp"
gulp.task('default', [
    // 'clientscripts',
    // 'clientResources',
    'serverscripts'
]);

// // This task can be run alone with "gulp clientscripts"
// gulp.task('clientscripts', () => {
//     return clientTsProject.src()
//                           .pipe(clientTsProject())
//                           .js
//                           .pipe(gulp.dest('client/app'));
// });



/**
 * Copy all resources that are not TypeScript files into build directory. e.g. index.html, css, images
 */
// gulp.task("clientResources", () => {
//     return gulp.src(["client/src/**/*", "!**/*.ts", "!**.json"])
//                 .pipe(gulp.dest('client/app'));
// });



// var exec = require('child_process').exec;

// gulp.task('clientscripts', (cb) =>  {
//     exec('ng build', (err, stdout, stderr) => {
//         console.log(stdout);
//         console.log(stderr);
//         cb(err);
//     });
// })

// This task can be run alone with "gulp serverscripts"
gulp.task('serverscripts', () => {
    return serverTsProject.src()
                        .pipe(serverTsProject())
                        .js
                        .pipe(gulp.dest('dist'));
});

// By adding this, we can run "gulp watch" to automatically
// run the build when we change a script
gulp.task('watch', () => {
    // gulp.watch('client/src/**/*', [ 'clientscripts', 'clientResources' ]);
    gulp.watch('server/src/**/*', [ 'serverscripts' ]);
});
