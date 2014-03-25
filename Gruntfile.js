var path = require('path');

var cssDir = 'assets/css';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
/*  TODO: REMOVE WHEN LESS COMPILES SUCCESSFULY
    stylus: {
      compile: {
        options: {
          paths: [cssDir],
          'include css': true
        },
        files: {
          'public/styles.css': cssDir + '/index.styl'
        }
      }
    },
*/
    less: {
        development: {
            options: {
                paths: [cssDir]
            },
            files: {
                'public/styles.css': cssDir + '/styles.less'
            }
        }
    },

    handlebars: {
      compile: {
        options: {
          namespace: false,
          commonjs: true,
          processName: function(filename) {
            return filename.replace('app/templates/', '').replace('.hbs', '');
          }
        },
        src: "app/templates/**/*.hbs",
        dest: "app/templates/compiledTemplates.js",
        filter: function(filepath) {
          var filename = path.basename(filepath);
          // Exclude files that begin with '__' from being sent to the client,
          // i.e. __layout.hbs.
          return filename.slice(0, 2) !== '__';
        }
      }
    },

    watch: {
      scripts: {
        files: 'app/**/*.js',
        tasks: ['browserify'],
        options: {
          interrupt: true
        }
      },
      templates: {
        files: 'app/**/*.hbs',
        tasks: ['handlebars'],
        options: {
          interrupt: true
        }
      },
      css: {
        files: [cssDir + '/**/*.less', cssDir + '/**/*.css'],
        tasks: ['less'],
        options: {
          interrupt: true
        }
      }
    },

    browserify: {
      options: {
        debug: true,
        alias: [
          'node_modules/rendr-handlebars/index.js:rendr-handlebars'
        ],
        aliasMappings: [
          {
            cwd: 'app/',
            src: ['**/*.js'],
            dest: 'app/'
          }
        ],
        shim: {
          jquery: {
            path: 'assets/vendor/jquery-1.9.1.min.js',
            exports: '$'
          }
        }
      },
      app: {
        src: [ 'app/**/*.js' ],
        dest: 'public/mergedAssets.js'
      },
      tests: {
        src: [
          'test/helper.js',
          'test/app/**/*.js'
        ],
        dest: 'public/testBundle.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  //grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('runNode', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['./node_modules/nodemon/nodemon.js', 'index.js'],
      opts: {
        stdio: 'inherit'
      }
    }, function () {
      grunt.fail.fatal(new Error("nodemon quit"));
    });
  });


  grunt.registerTask('compile', ['handlebars', 'browserify', 'less']);

  // Run the server and watch for file changes
  grunt.registerTask('server', ['compile', 'runNode', 'watch']);

  // Default task(s).
  grunt.registerTask('default', ['compile']);

};

