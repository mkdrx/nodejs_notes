const fs = require('node:fs')

console.log('Reading first file...')
fs.readFile('./file.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('first text:', text)
})

console.log('--->doing stuff while reads the file...')

console.log('Reading second file...')
fs.readFile('./file2.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('second text:', text)
})
