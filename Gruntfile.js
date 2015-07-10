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

    // register our tasks:
    grunt.registerTask('default', ['clean:dist', 'typescript:dist']);
};

