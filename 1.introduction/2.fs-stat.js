const fs = require('node:fs')

// Synchronous
const stats = fs.statSync('./file.txt')

console.log(
  stats.isFile(), // to check if it is a file
  stats.isDirectory(), // if folder
  stats.isSymbolicLink(),
  stats.size
)
