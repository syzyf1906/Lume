const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '..', 'src', 'main', 'preload.js')
const destDir = path.resolve(__dirname, '..', 'dist', 'main')
const dest = path.join(destDir, 'preload.js')

fs.mkdirSync(destDir, { recursive: true })
fs.copyFileSync(src, dest)
console.log(`Copied preload.js -> ${dest}`)
