const purgecss      = require('@fullhuman/postcss-purgecss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');

module.exports = {
	plugins: [
		purgecss({
            content: ['./**/*.pug']
        }),
        autoprefixer(),
        cssnano({ preset: require('cssnano-preset-default')})
	]
};