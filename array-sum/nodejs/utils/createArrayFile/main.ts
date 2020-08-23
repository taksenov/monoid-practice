import * as fs from 'fs';

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
  process.exit();
}
if (!outputParam.status) {
  console.log(
    `Не указан обязательный параметр "${OUTPUT_PARAM}". Воспользуйтесь параметром "${HELP_PARAM}" для справки`,
  );
  process.exit();
}
if (!secretParam.status) {
  console.log(
    `Не указан обязательный параметр "${SECRET_PARAM}". Воспользуйтесь параметром "${HELP_PARAM}" для справки`,
  );
  process.exit();
}

const file = fs.createWriteStream(outputParam.body || 'error.txt');
const arraySize = Number(sizeParam.body) || 10;
const secret = Number(secretParam.body);

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

let totalSum = 0;

file.write('{ "array": [');
for (let i = 0; i < arraySize; i++) {
  const num = getRandomInt(1000);
  const timeInMs = Date.now();
  // secret
  totalSum += num;

  if (i < arraySize - 1) {
    file.write(`${num},`);
  } else {
    file.write(`${num}`);
  }
}

file.end(`],
"array-size": ${arraySize},
"total-sum": ${totalSum}
}`);
