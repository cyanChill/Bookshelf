module.exports = {
	globDirectory: 'public\\',
	globPatterns: [
		'**/*.{html,css}',
		'src/images/*.{jpg,png}',
		'src/js/*.js'
	],
	swDest: 'public/service-worker.js',
	swSrc: "public/sw-base.js",
	globIgnores: [
		"..\\workbox-cli-config.js"
	]
};