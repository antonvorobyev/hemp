module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig(
        {
            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                files: [
                    'js/**/*.js',
                    '!js/vendor/**/*.js'
                ]
            },

            concat: {
                main: {
                    src: [
                        'js/vendor/jquery.js',
                        'js/vendor/**/*.js',
                        'js/*.js'
                    ],
                    dest: 'build/main.js'
                }
            },

            uglify: {
                main: {
                    files: {
                        'build/main.min.js': '<%= concat.main.dest %>'
                    }
                }
            },

            watch: {
                js: {
                    files: [
                        'js/**/*.js'
                    ],
                    tasks: ['jshint'],
                    options: {
                        livereload: true
                    }
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        '*.html',
                        'css/**/*.css',
                        'js/**/*.js',
                        'img/**/*.{png,jpg,gif}',
                        'fonts/**/*.{ttf}'
                    ]
                }

            },

            connect: {
                options: {
                    port: 8000,
                    livereload: 35729,
                    hostname: 'localhost'
                },
                livereload: {
                  options: {
                      open: true,
                      base: '.'
                  }
                }
            }
        });

    grunt.registerTask('default', ['jshint', 'connect', 'watch']);
    grunt.registerTask('debug', ['jshint']);
    grunt.registerTask('release', ['jshint', 'concat', 'uglify']);

};