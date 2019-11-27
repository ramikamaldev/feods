let grunt = require("grunt");
let deploymentEnv = grunt.option('env');

grunt.initConfig({
  clean: ['./bin', "./tscommand*.**"],
  copy: {
    files: {
      src: `./config/${deploymentEnv}-env/${deploymentEnv}.env`, // copy all files and subfolders
      dest: "./config/config.env", // destination folder
    }
  },
  ts: {
    options: {
      compile: true,
      target: 'es2016',
      module: 'commonjs',
      rootDir: "./src",
      comments: true,
      failOnTypeErrors: true,
      noImplicitAny: false,
      noImplicitReturns: false,
      pretty: true,
      strict: false,
      strictNullChecks: false,
      strictPropertyInitilization: false,
      verbose: true,
      sourceMap: false,
      declaration: false,
      esModuleInterop: true
    },
    azure: {
      src: ["./src/**/*.ts",["./src/views"]],
      outDir: "bin",
      options: {
        esModuleInterop: true
      }
    },
    dev:
    {
      src: ["./src/**/*.ts",["./src/views"]],
      outDir: "bin",
      watch: "./src",
      options: {
        fast: "watch"
      }
    }
  }
});
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks("grunt-ts");

grunt.registerTask('default', ["clean", "copy", `ts:${deploymentEnv}`]);