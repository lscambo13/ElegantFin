const cssDeclarationSorter = require('css-declaration-sorter');
const cssnano = require('cssnano');

module.exports = {
	plugins: [
		cssDeclarationSorter({
			keepOverrides: true,
		}),
		cssnano({
			preset: 'default',
		}),
	],
};