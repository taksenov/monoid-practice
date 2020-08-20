// Write 'hello, ' and then end with 'world!'.
import * as fs from 'fs';

const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// Writing more now is not allowed!
