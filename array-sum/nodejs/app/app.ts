import * as fs from 'fs';

import bcrypt from 'bcrypt';

import Params from '../utils/Params';
import { SECRET_PARAM, INPUT_PARAM } from '../utils/constants';

const execParams = process.argv;
const checkParams = new Params();

const secretParam = checkParams.handleCheckWorkParams(SECRET_PARAM, execParams);
const inputParam = checkParams.handleCheckWorkParams(INPUT_PARAM, execParams);

if (!secretParam.status) {
  console.log(`Не указан обязательный параметр "${SECRET_PARAM}".`);
  process.exit(-1);
}
if (!inputParam.status) {
  console.log(`Не указан обязательный параметр "${INPUT_PARAM}".`);
  process.exit(-1);
}

const data = JSON.parse(fs.readFileSync(String(inputParam.body), 'utf8'));

// IDEA: Пригодятся! Проверочные данные из файла
// const refSum = data['total-sum'];
// const refSize = data['array-size'];

// Пароль
const secret = String(secretParam.body);

// Данные рассчитанные
const dataSize = data.array.length;
let dataSum = 0;

/**
 * Рассчет разницы во времени, между началом и окончанием оперции
 *
 * @param {bigint} begin
 * @param {bigint} end
 */
const timeDiff = (begin: bigint, end: bigint) => (end - begin) / 1000000n;

const begin = process.hrtime.bigint();

for (let i = 0; i < dataSize; i++) {
  const { num, time, hash } = data.array[i];

  if (bcrypt.compareSync(`${num}${time}${secret}`, hash)) {
    dataSum += num;
  } else {
    console.log('Данные не корректны: ', num, time);
    process.exit(-1);
  }
}

const end = process.hrtime.bigint();

console.log('[СИНХРОННЫЙ, ПОСЛЕДОВАТЕЛЬНЫЙ РАСЧЕТ]');
console.log('Время рассчета суммы:', timeDiff(begin, end), ' ms.');
console.log('Контрольная сумма: ', data['total-sum']);
console.log('Рассчитанная сумма: ', dataSum);
console.log('==============');
