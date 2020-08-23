# createArrayFile

Утилита для создания файла с данными

Используется `ts-node`

Команды запуска:

```
npm i
npx ts-node ./utils/createArrayFile/main.ts --size=1000 --output='../genFiles/arr1000.json' --secret=Use_Your_SCRT_For_Encrypt
```

Для получения справки:

```
npx ts-node ./utils/createArrayFile/main.ts --help
```

# calculateDataSyncronous

Расчет данных. Синхронная версия для визуализации скорости работы. Время
расчитывается с повышенной точностью

Используется `ts-node`

Команды запуска:

```
npm i
npx ts-node ./app/app.ts --secret=1000 --input='../genFiles/arr1000.json' --secret=Use_Your_SCRT_For_Decrypt
```
