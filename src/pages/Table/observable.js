import { makeAutoObservable, reaction, runInAction } from 'mobx';

import {
  DatabaseSourceColKeys,
  DatabaseTargetColKeys,
  KafkaSourceColKeys,
  KafkaTargetColKeys,
  StandardSourceColKeys,
  StandardTargetColKeys,
} from './columns';

/** Tranform object to observable object ( kafka -> standard ).
 * @param {Array} dataSource data source.
 * @param {Function} change emit the change.
 * @returns {Array} [Observable, Observable]
 */
function makeKafka2Standard(dataSource, change) {}

/** Tranform object to observable object ( kafka -> database ).
 * @param {Array} dataSource data source.
 * @param {Function} change emit the change.
 * @returns {Array} [Observable, Observable]
 */
function makeKafka2Database(dataSource, change) {}

/** Tranform object to observable object ( standard -> kafka ).
 * @param {Array} dataSource data source.
 * @param {Function} change emit the change.
 * @returns {Array} [Observable, Observable]
 */
function makeStandard2Kafka(dataSource, change) {}

/** Tranform object to observable object ( standard -> database ).
 * @param {Array} dataSource data source.
 * @param {Function} change emit the change.
 * @returns {Array} [Observable, Observable]
 */
function makeStandard2Database(dataSource, change) {}

/** Tranform object to observable object ( database -> standard ).
 * @param {Array} dataSource data source.
 * @param {Function} change emit the change.
 * @returns {Array} [Observable, Observable]
 */
function makeDatabase2Standard(dataSource, change) {}

/** Tranform object to observable object ( database -> kafka ).
 * @param {Array} dataSource data source.
 * @param {Function} change emit the change.
 * @returns {Array} [Observable, Observable]
 */
function makeDatabase2Kafka(dataSource, change) {}

/** Tranform object to observable object ( database -> database ).
 * @param {Array} dataSource data source.
 * @param {Function} change emit the change.
 * @returns {Array} [Observable, Observable]
 */
function makeDatabase2Database(dataSource, change) {}

const funcs = {
  11: makeDatabase2Database,
  12: makeDatabase2Kafka,
  13: makeDatabase2Standard,
  21: makeKafka2Database,
  23: makeKafka2Standard,
  31: makeStandard2Database,
  32: makeStandard2Kafka,
};

/** Tranform data source to observable object.
 * @param {Array} dataSource data source
 * @param {Number} sourceType source type value
 * @param {Number} targetType target type value
 * 
 * @returns {Array} [Observable, Observable]
 */
export function makeSourceObservable(...args) {
  const [dataSource, sourceType, targetType, change] = args;

  const getType = (type) => ({1: '1', 2: '2'}[type / 100 | 0] || '3');

  return funcs[`${getType(sourceType)}${getType(targetType)}`](dataSource, change);
}
