const fs = require('fs')
const readStream = fs.createReadStream('./docs/blog1.txt',{encoding: 'utf8'})
const writeStrean = fs.createWriteStream('./docs/blog2.txt')
// readStream.on('data', (chunk) => {
//     console.log('---------new chunk ------------')
//     console.log(chunk)
//     writeStrean.write('\n NEW CHUNK \n')
//     writeStrean.write(chunk)
// })

// piping 

readStream.pipe(writeStrean)