/**
 * Grunt project configuration.
 */
module.exports = function(grunt) {
    // configuration for the plugins.
    grunt.initConfig({
        typescript: {
            "dist" : {
                options: {
                    module : 'commonjs',
                    sourceMap: true,
                    declaration: true,
                },
                files: [{
                    dest: "target/out.js",
                    src: [
                        "src/main/core/**/*.ts",
                        "src/main/core/**/*.d.ts"
                    ]
                }]
            },

            "grunt" : {
                options: {
                    module : 'commonjs',
                    sourceMap: true,
                    declaration: true,
                },
                files: [{
                    dest: "tasks/tsdlocal.js",
                    src: [
                        "src/main/grunt/**/*.ts",
                        "src/main/grunt/**/*.d.ts"
                    ]
                }]
            }
        },

        tsdlocal : {
            dist : {
                files : [
                    { expand: true, cwd: 'target/', src: ['**/*.js'], dest: 'target/' }
                ]
            },

            grunt : {
                files : [
                    { expand: true, cwd: 'tasks/', src: ['**/*.js'], dest: 'tasks/' }
                ]
            }
        },

        sync : {
            dist : {
                // pretend: true,
                verbose: true,
                files : [
                    { expand: true, cwd: 'src/main/core', src: ['**/*.js'], dest: 'target/' }
                ]
            }
        },

        clean: {
            dist : [
                "target/"
            ],

            grunt : [
                "tasks/"
            ]
        }
    });

    // load NPM tasks:
    // grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('tsdlocal');

    // register our tasks:
    grunt.registerTask('default', ['clean', 'typescript', 'tsdlocal', 'sync']);
};

