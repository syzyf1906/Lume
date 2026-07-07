const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '..', 'src', 'main', 'preload.js')
const destDir = path.resolve(__dirname, '..', 'dist', 'main')
const dest = path.join(destDir, 'preload.js')

fs.mkdirSync(destDir, { recursive: true })
fs.copyFileSync(src, dest)
console.log(`Copied preload.js -> ${dest}`)

// create a minimal package.json in dist so electron-builder can find app package
const pkgPath = path.resolve(__dirname, '..', 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
const minimal = {
	name: pkg.name || 'lume',
	version: pkg.version || '0.1.0',
	main: pkg.main || 'main/main.js',
	description: pkg.description || '',
	author: pkg.author || ''
}
const pkgDest = path.resolve(__dirname, '..', 'dist', 'package.json')
fs.writeFileSync(pkgDest, JSON.stringify(minimal, null, 2))
console.log(`Wrote minimal package.json -> ${pkgDest}`)
