module.exports = {
	prod: {
		options: {
			sassDir: 'src/styles',
			cssDir: 'public/styles',
			environment: 'production'
		}
	},
	dev: {
		options: {
			sassDir: 'src/styles',
			cssDir: 'public/styles'
		}
	}
};
