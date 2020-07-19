// const test = require('./data')

// console.log(test.people, test.age);

const os = require('os')
console.log('cpus => ');
console.log(os.cpus());
console.log('free memory => ');
console.log(os.freemem());
console.log('home dir =>');
console.log(os.homedir());
console.log('platform => ');
console.log(os.hostname());