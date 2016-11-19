/**
 * Created by Zuhaib Kathwari on 11/19/2016.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['/public/**/*.js'],
                options: {
                    spawn: false
                }
            }
        },
        express: {
            options: {
                // Override defaults
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['express','watch']);
};
