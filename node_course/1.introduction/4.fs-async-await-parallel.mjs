import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./file.txt', 'utf-8'),
  readFile('./file2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('First text:', text)
  console.log('First second:', secondText)
})
