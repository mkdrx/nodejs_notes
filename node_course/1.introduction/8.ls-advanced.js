const fs = require('node:fs/promises')
const path = require('node:path')
const picocolors = require('picocolors')

// Since [0] is node, [1] is the folder
const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(picocolors.red(`Could not read directory ${folder}`))
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
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleString()

    return `${picocolors.bgMagenta(fileType)} ${picocolors.blue(file.padEnd(20))} ${picocolors.green(fileSize.padStart(10))} ${picocolors.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filePromises)

  filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
