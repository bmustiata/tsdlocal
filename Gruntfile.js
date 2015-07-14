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
            ]
        }
    });

    // load NPM tasks:
    // grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sync');

    // register our tasks:
    grunt.registerTask('default', ['clean:dist', 'typescript:dist', 'sync:dist']);
};

