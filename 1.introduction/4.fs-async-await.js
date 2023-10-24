const fs = require('node:fs/promises')

// Common in old node files
// IIFE - Immediately Invoked Function Expression
;(async () => {
  console.log('Reading first file...')
  fs.readFile('./file.txt', 'utf-8').then((text) =>
    console.log('First text:', text)
  )

  console.log('--->doing stuff while reads the file...')

  console.log('Reading second file...')
  fs.readFile('./file2.txt', 'utf-8').then((text) =>
    console.log('First second:', text)
  )
})()
