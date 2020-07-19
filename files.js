const fs = require('fs')
// reading files 
// fs.readFile('./data.js', ( err, data ) => {
//     err ? console.log(err): console.log(data.toString());
// })
// console.log('asdhjfj ================= ');

// write files
fs.writeFile('./docs/blog2.txt', 'hello world', () => {
    console.log('files was written successfully');
})

// directories
if(!fs.existsSync('./assets')){
    fs.mkdir('./assets',(err)=>{
        err ? console.log(err) : console.log('folder created successfully')
    })
} else {
    fs.rmdir('./assets', (err) => {
        err ? console.log(err) : console.log('folder deleted');
    })
}

// deleting files
fs.existsSync('./docs/blog2.txt') 
? 
fs.unlink('./docs/blog2.txt', (err) => err ? console.log(err)
:
'') 
: console.log('file is deletes successfully')