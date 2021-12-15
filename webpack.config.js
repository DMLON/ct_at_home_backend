const path = require('path');

module.exports = {
    //Tipo de bundling, production o development
    mode: 'production',

    //Punto de entrada
    entry: "./src/index.ts",

    target: "node",

    //Punto de salida
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js'
    },

    //Configura como se resuleven los modulos
    resolve: {
        extensions: [".ts", ".js"]
    },

    // Le aclara al webpack como se deben procesar los loaders que queremos usar para el proyecto
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}