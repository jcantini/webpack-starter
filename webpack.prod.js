const HtmlWebPack    = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: {
        clean: true, //para que me borre los archivos en el directorio dist y cree todo nuevo
        filename: 'main.[contenthash].js' //le defino el nombre que quiero que tenga el ejecutable 
    },

    module: {
        rules: [
            {
                test: /\.html$/, // para que me copie todo lo que es .html a la carpeta dist
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/, // busca todos los archivos .css y le aplica los siguientes loaders
                exclude: /styles.css$/, //esto es xq sino entraria aca y no seguiria a la siguiente regla
                use: [ 'style-loader', 'css-loader'] // aplico estos loadaer y los paso a la carpeta dist
            },
            {
                test: /styles.css$/, //Esto es solo para este archivo 
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif)$/, // busco las imagenes
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]

        
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(), // Para comprimir el css y reducir su tamaño 
            new Terser(),       // Se usa junto con CssMinimizer
        ]
    },

    plugins: [
        new HtmlWebPack({
            title: 'Mi Webpack app', // Le puedo cambiar el titulo a la app
            // filename: 'index.html'  Nombre con que quiero que se llame el archivo de ejecucion que me deja en 
            // dist. Por default di no pongo nada me lo crea como index.html
            template: './src/index.html' //Le indico el archivo que tiene que tomar para generar al app en dist
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css', //name indica que use el mismo nombre
            // filename: '[name].[fullhash].css',
            // fullhash le genera un hash adicional al nombre para que no se mantenga en el cache del navegador
            // asi si hago cambios en el css siempre se carga el ultimo ccs del build. Esto lo haria para produccion
            ignoreOrder: false
        }),

        new CopyPlugin({  //es para copiar todos los recursos estaticos a la carpeta de distribucion
            patterns: [
                 { from: 'src/assets/', to: 'assets/'}
            ]
        })
    ],

    
}