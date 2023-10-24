// Following code in comments can be used for modules that don't support promises
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile);

const fs = require('node:fs/promises')

console.log('Reading first file...')
fs.readFile('./file.txt', 'utf-8').then((text) =>
  console.log('First text:', text)
)

console.log('--->doing stuff while reads the file...')

console.log('Reading second file...')
fs.readFile('./file2.txt', 'utf-8').then((text) =>
  console.log('First second:', text)
)
