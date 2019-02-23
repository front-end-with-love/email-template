// Стандартный экспорт модуля в nodejs
module.exports = function(grunt) {

    // Инициализация конфига GruntJS (конфигурация проекта)
    grunt.initConfig({

        // Include package.json
        pkg: grunt.file.readJSON('package.json'),

        // Переменные каталогов проекта
        project: {
            app: ['public'],
            assets: ['<%= project.app %>/assets'],
            css: ['<%= project.assets %>/sass/main.scss'],
            libs: ['<%=project.app %>/libs'],
            js: ['<%= project.assets %>/js']
        },

        // Настройки сервера
        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },

        // Включаем HTML в шаблон
        htmlbuild: {
            dist: {
                src: '<%= project.app %>/tpls/index-source.html',
                dest: '<%= project.app %>/tpls/index-source-include.html',
                options: {
                    sections: {
                        layout: {
                            header: '<%= project.app %>/tpls/layout/header.html',
                            content: '<%= project.app %>/tpls/layout/content.html',
                            footer: '<%= project.app %>/tpls/layout/footer.html'
                        }
                    }
                }
            }
        },

        // SASS
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourceMap: true
                },
                files: {
                    '<%= project.assets %>/css/build/allcss.css': '<%= project.css %>'
                }
            }
        },

        // Autoprefixer
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 8 versions', 'ie 9']
            },
            single_file: {
                src: '<%= project.assets %>/css/build/allcss.css',
                dest: '<%= project.assets %>/css/build/production.css'
            }

        },

        // Inline CSS
        inlinecss: {
            options: {
                webResources: {
                    images: false,
                }
            },
            main: {
                files: {
                    '<%= project.app %>/tpls/index-all.html': '<%= project.app %>/tpls/index-source-include.html'
                }
            }
        },

        // HTML min
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= project.app %>/index.html': '<%= project.app %>/tpls/index-all.html',
                }
            }
        },

        // Слежение за изменениями
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: [
                    '<%= project.assets %>/sass/{,*/}*.{scss,sass}'
                ],
                tasks: ['sass','autoprefixer','inlinecss','htmlmin'],
                options: {
                    spawn: false
                },
                options: {
                  livereload: true,
                }
            },
            html: {
                files: [
                    '<%= project.app %>/tpls/layout/*.html',
                    '<%= project.app %>/tpls/layout/**/*.html',
                    '<%= project.app %>/tpls/layout/**/**/*.html'
                ],
                tasks: ['htmlbuild','inlinecss','htmlmin'],
                options: {
                    spawn: false
                },
                options: {
                  livereload: true,
                }
            }
        }

    });

    // Загрузка модулей, которые предварительно установлены
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-inline-css');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Эти задания будут выполнятся сразу после команды grunt
    grunt.registerTask('default', ['express', 'htmlbuild', 'sass', 'autoprefixer', 'inlinecss', 'htmlmin', 'watch']);

};
