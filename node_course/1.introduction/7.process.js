// Global object - provides information and control over the current Node.js process

// Arguments
// console.log(process.argv)

// Process control and the outcome
// process.exit(1) // 0 = all good, process ends there - 1 = some error

// Can control events
process.on('exit', () => {
  // clear resources etc
})

// Current working directory
console.log(process.cwd())

// Platform
console.log(process.env.SOMEVARIABLE)
