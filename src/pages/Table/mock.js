import { isKafka, isDatabase } from './utils';

const kafka = [
  {
    key: 'key1',
    sourcePath: 'path1',
    alias: 'alias1',
    defaultValue: 'value1',
  },
  {
    key: 'key2',
    sourcePath: 'path2',
    alias: 'alias2',
    defaultValue: 'value2',
  },
  {
    key: 'key3',
    sourcePath: 'path3',
    alias: 'alias3',
    defaultValue: 'value3',
  },
];

const kafkaFormat = [
  {
    sourcePath: 'path2',
    alias: 'alias2',
    defaultValue: 'value2',
  },
];

const database = [
  {
    key: 'key1',
    name: 'path1',
    type: 'alias1',
  },
  {
    key: 'key2',
    name: 'path2',
    type: 'alias2',
  },
  {
    key: 'key3',
    name: 'path3',
    type: 'alias3',
  },
];

const databaseFormat = [
  {
    name: 'path2',
    type: 'varchar',
  },
];

const standard = [
  {
    key: 'key1',
    name: 'path1',
    type: 'alias1',
  },
  {
    key: 'key2',
    name: 'path2',
    type: 'alias2',
  },
  {
    key: 'key3',
    name: 'path3',
    type: 'alias3',
  },
];

const standardFormat = [
  {
    name: 'path2',
    type: 'varchar',
  },
];

export function getMockData(sourceType, targetType) {
  const dataSource = isDatabase(sourceType) ? database : isKafka(sourceType) ? kafka : standard;
  const defaultValue = {
    inputFormat: isDatabase(sourceType) ? databaseFormat : isKafka(sourceType) ? kafkaFormat : standardFormat,
    outputFormat: isDatabase(targetType) ? databaseFormat : isKafka(targetType) ? kafkaFormat : standardFormat,
  };

  return { dataSource, defaultValue, sourceType, targetType };
}