const os = require('node:os')

console.log('Sysinfo')
console.log('_______')

console.log('System name', os.platform())
console.log('System version', os.release())
console.log('Arch', os.arch())
console.log('CPUs', os.cpus()) // <- we can scale processes in Node.js
console.log('Memory libre', os.freemem() / 1024 / 1024)
console.log('Memory total', os.totalmem() / 1024 / 1024)
console.log('Uptime', os.uptime() / 60 / 60)
