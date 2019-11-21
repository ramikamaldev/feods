let grunt = require("grunt");
let config = grunt.file.read("./config/dev-env/config.env");
grunt.file.delete("./tscommand*")
grunt.file.write("./config/config.env", config)
grunt.initConfig({
    clean: ['./bin', "./tscommand*.**"],
    ts: {
        default: {
            src: ["./src/**/*.ts"],
            outDir: "bin",
            watch: "src",
            options: {
                compile: true,
                target: 'es2016',
                module: 'commonjs',
                fast: "watch",
                rootDir: "./src",
                comments: true,
                failOnTypeErrors: true,
                noImplicitAny: false,
                noImplicitReturns: false,
                pretty: true,
                strict: false,
                strictNullChecks: true,
                strictPropertyInitilization: true,
                strictNullChecks: true,
                verbose: true,
                sourceMap: false,
                declaration: false,
                esModuleInterop: true

            }
        }
    }
});
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks("grunt-ts");

//grunt.registerTask("default", ["ts:copy"]);
grunt.registerTask('default', ["clean", 'ts']);