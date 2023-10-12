const fs = require('node:fs/promises')
const path = require('node:path')

// Since [0] is node, [1] is the folder
const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(`Could not read directory ${folder}`)
    process.exit(1)
  }

  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath) // gives file info
    } catch {
      console.error(`Could not read file ${filePath}`)
      process.exit(1)
    }

    const isDir = stats.isDirectory()
    const fileType = isDir ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${file.padEnd(20)} ${fileSize
      .toString()
      .padStart(10)} ${fileModified}`
  })

  const filesInfo = await Promise.all(filePromises)

  filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
