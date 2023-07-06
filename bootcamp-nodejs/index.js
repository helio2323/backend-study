
const fs = require('fs')


//Blocking, synchronous way
//const textIn = fs.readFileSync('./input.txt', 'utf-8')
//console.log(textIn)

//const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`

//fs.writeFileSync('./input.txt', textOut);

//console.log('File written!');

// Non-blocking, asynchronous way

fs.readFile('./start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data1)
        console.log(data2)
    });
   
});
console.log('Will read file!')