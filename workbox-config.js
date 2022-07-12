module.exports = {
	globDirectory: 'docs\\',
	globPatterns: [
		'**/*.{html,css}',
		'src/images/*.{jpg,png}',
		'src/js/*.js'
	],
	swDest: 'docs/service-worker.js',
	swSrc: "docs/sw-base.js",
	globIgnores: [
		"..\\workbox-cli-config.js"
	]
};