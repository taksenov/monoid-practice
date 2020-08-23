import * as data from '../../genFiles/arr100000.json';

// Проверочные данные из файла
const refSum = data['total-sum'];
const refSize = data['array-size'];

// Данные рассчитанные
const dataSize = data.array.length;
let dataSum = 0;

const timeDiff = (begin: bigint, end: bigint) => (end - begin) / 1000000n;

const begin = process.hrtime.bigint();

for (let i = 0; i < dataSize; i++) {
  dataSum += data.array[i];
  console.log('Шаг: ', i);
}

const end = process.hrtime.bigint();

console.log('Время рассчета суммы:', timeDiff(begin, end), ' ms.');

console.log('Контрольная сумма: ', data['total-sum']);
console.log('Рассчитанная сумма: ', dataSum);
console.log('==============');

dataSum = 0;

const begin2 = process.hrtime.bigint();

for (let i = 0; i < dataSize; i++) {
  dataSum += data.array[i];
}

const end2 = process.hrtime.bigint();

console.log('Время рассчета суммы:', timeDiff(begin2, end2), ' ms.');

console.log('Контрольная сумма: ', data['total-sum']);
console.log('Рассчитанная сумма: ', dataSum);
console.log('==============');
// console.log(data['total-sum']);
// console.log(data['array-size']);
// console.log(data.array);
