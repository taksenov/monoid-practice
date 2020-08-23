# Array sum

Перед тем как начать:

```bash
git clone git@github.com:taksenov/monoid-practice.git
cd ./monoid-practice/array-sum/nodejs
npm i
```

## createArrayFile

Утилита для создания файла с данными:

```json
{
  "array": [
    {
      "num": 715,
      "time": 1598195687382,
      "hash": "$2b_________________________Bp."
    },
    {
      "num": 628,
      "time": 1598195687383,
      "hash": "$2b_________________________eLe"
    }
  ],
  "array-size": 2,
  "total-sum": 1343
}
```

Команда запуска:

```bash
npx ts-node ./utils/createArrayFile/main.ts --size=1000 --output='../genFiles/arr1000.json' --secret=Use_Your_SCRT_For_Encrypt
```

Для получения справки:

```bash
npx ts-node ./utils/createArrayFile/main.ts --help
```

## calculateDataSyncronous

Расчет данных, полученных в файле созданном в разделе **createArrayFile**. Время
в бейнчмарке рассчитывается с повышенной точностью.

Реализованы варианты:

- Синхронная версия для визуализации скорости работы;

Команда запуска:

```bash
npx ts-node ./app/app.ts --secret=1000 --input='../genFiles/arr1000.json' --secret=Use_Your_SCRT_For_Decrypt
```
