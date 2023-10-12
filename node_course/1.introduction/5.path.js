const path = require('node:path')

// OS bar separator
console.log(path.sep)

// Join routes with path.join regardless of OS
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// File name with extension, without extension and only the extension
const base = path.basename('/tmp/secret-folder/pw.txt')
console.log(base)

const fileName = path.basename('/tmp/secret-folder/pw.txt', '.txt')
console.log(fileName)

const extension = path.extname('image.jpg')
console.log(extension)
