module.exports = {
	"options": {
		"livereload": true
	},
	"gruntfile": {
		"files": ["Gruntfile.js","grunt/*.js"],
		"tasks": ["jshint:gruntfile"],
		"interrupt": true
	},
	"js": {
		"files": "src/scripts/**/*",
		"tasks": ["jshint:js", "browserify"],
		"interrupt": true
	},
	"css": {
		"files": "src/styles/**/*.scss",
		"tasks": "compass:dev",
		"interrupt": true
	},
	"copy": {
		"files": ["src/**/*", "!src/scripts/*", "!src/styles/*"],
		"tasks": "copy:static",
		"interrupt": true
	}
};
