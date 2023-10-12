import {
  platform,
  release,
  arch,
  cpus,
  freemem,
  totalmem,
  uptime
} from 'node:os'

console.log('Sysinfo')
console.log('_______')

console.log('System name', platform())
console.log('System version', release())
console.log('Arch', arch())
console.log('CPUs', cpus()) // <- we can scale processes in Node.js
console.log('Memory libre', freemem() / 1024 / 1024)
console.log('Memory total', totalmem() / 1024 / 1024)
console.log('Uptime', uptime() / 60 / 60)
