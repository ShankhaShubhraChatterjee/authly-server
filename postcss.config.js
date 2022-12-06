const purgecss      = require('@fullhuman/postcss-purgecss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');

module.exports = {
	plugins: [
		purgecss({
            content: ['./**/*.pug'],
            FontFace:true,
            keyframes:true,
            safelist: [
                'theme', 
                'dark-theme', 
                'light-theme', 
                'display',
                'no-display'
            ]
        }),
        autoprefixer(),
        cssnano({ preset: require('cssnano-preset-default')})
	]
};