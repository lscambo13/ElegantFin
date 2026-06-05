const cssDeclarationSorter = require('css-declaration-sorter');
const cssnano = require('cssnano');

module.exports = {
	plugins: [
		cssDeclarationSorter({
			keepOverrides: true,
			order: (a, b) => {
				const aVar = a.startsWith('--');
				const bVar = b.startsWith('--');

				if (aVar && !bVar) return -1;
				if (!aVar && bVar) return 1;

				return a.localeCompare(b);
			},
		}),
		cssnano({
			preset: 'default',
		}),
	],
};