
const mix = require('laravel-mix');

require("laravel-mix-react-typescript-extension");

mix.autoload({})
.reactTypeScript('src/js/main.tsx', 'dist/js')
.sass('src/scss/main.scss', 'dist/css/main.css')
.webpackConfig({
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
});