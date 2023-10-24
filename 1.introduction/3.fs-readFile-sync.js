const fs = require('node:fs')

console.log('Reading first file...')
const text = fs.readFileSync('./file.txt', 'utf-8')
console.log('First text:', text)

console.log('--->doing stuff while reads the file...')

console.log('Reading second file...')
const secondText = fs.readFile('./file2.txt', 'utf-8')
console.log('First text:', secondText)
