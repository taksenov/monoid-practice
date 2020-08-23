import * as fs from 'fs';

import bcrypt from 'bcrypt';

import Params from '../Params';
import {
  OUTPUT_PARAM,
  SIZE_PARAM,
  HELP_PARAM,
  SECRET_PARAM,
} from '../constants';

const execParams = process.argv;
const checkParams = new Params();

const helpParam = checkParams.handleCheckHelpParam(HELP_PARAM, execParams);
if (helpParam.status === true) {
  console.log(helpParam.body);
  process.exit();
}

const sizeParam = checkParams.handleCheckWorkParams(SIZE_PARAM, execParams);
const outputParam = checkParams.handleCheckWorkParams(OUTPUT_PARAM, execParams);
const secretParam = checkParams.handleCheckWorkParams(SECRET_PARAM, execParams);

if (!sizeParam.status) {
  console.log(
    `Не указан обязательный параметр "${SIZE_PARAM}". Воспользуйтесь параметром "${HELP_PARAM}" для справки`,
  );
  process.exit(-1);
}
if (!outputParam.status) {
  console.log(
    `Не указан обязательный параметр "${OUTPUT_PARAM}". Воспользуйтесь параметром "${HELP_PARAM}" для справки`,
  );
  process.exit(-1);
}
if (!secretParam.status) {
  console.log(
    `Не указан обязательный параметр "${SECRET_PARAM}". Воспользуйтесь параметром "${HELP_PARAM}" для справки`,
  );
  process.exit(-1);
}

const file = fs.createWriteStream(outputParam.body || 'error.txt');
const arraySize = Number(sizeParam.body) || 10;
const secret = String(secretParam.body);
const saltRounds = 3;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}


let totalSum = 0;

file.write('{ "array": [');
for (let i = 0; i < arraySize; i++) {
  const num = getRandomInt(1000);
  const timeInMs = Date.now();

  const hash = bcrypt.hashSync(`${num}${timeInMs}${secret}`, saltRounds);

  if (i < arraySize - 1) {
    file.write(`{"num":${num}, "time": ${timeInMs}, "hash":"${hash}"},`);
  } else {
    file.write(`{"num":${num}, "time": ${timeInMs}, "hash":"${hash}"}`);
  }

  totalSum += num;
}

file.end(`],
"array-size": ${arraySize},
"total-sum": ${totalSum}
}`);
