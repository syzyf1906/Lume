const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '..', 'src', 'main', 'preload.js')
const destDir = path.resolve(__dirname, '..', 'dist', 'main')
const dest = path.join(destDir, 'preload.js')

fs.mkdirSync(destDir, { recursive: true })
fs.copyFileSync(src, dest)
console.log(`Copied preload.js -> ${dest}`)

// also copy package.json into dist so electron-builder can find app package
const pkgSrc = path.resolve(__dirname, '..', 'package.json')
const pkgDest = path.resolve(__dirname, '..', 'dist', 'package.json')
fs.copyFileSync(pkgSrc, pkgDest)
console.log(`Copied package.json -> ${pkgDest}`)
