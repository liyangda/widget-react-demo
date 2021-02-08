import { makeSourceObservable } from './observable';

import { NODE_KAFKA, NODE_DATABASE } from './constant';

import {
  DatabaseSourceColumns,
  KafkaSourceColumns,
  StandardSourceColumns,
  DatabaseTargetColumns,
  KafkaTargetColumns,
  StandardTargetColumns,
} from './columns';

/** Whether is kafka node or not.
 * @param {Number} type type value
 * @returns {Boolean}
 */
export const isKafka = (type) => NODE_KAFKA.test(type);
/** Whether is database node or not.
 * @param {Number} type type value
 * @returns {Boolean}
 */
export const isDatabase = (type) => NODE_DATABASE.test(type);

/** Get columns for source node.
 * @param {Number} type type value
 * @returns {Array}
 */
export const getSourceColumns = (type) => {
  if (isDatabase(type)) return DatabaseSourceColumns.slice();

  if (isKafka(type)) return KafkaSourceColumns.slice();

  return StandardSourceColumns.slice();
};
/** Get columns for target node.
 * @param {Number} type type value
 * @returns {Array}
 */
export const getTargetColumns = (type) => {
  if (isDatabase(type)) return DatabaseTargetColumns.slice();

  if (isKafka(type)) return KafkaTargetColumns.slice();

  return StandardTargetColumns.slice();
};
/** Get columns for nodes.
 * @param {Number} sourceType source type value
 * @param {Number} targetType target type value
 * @returns {Array}
 */
export const getColumns = (sourceType, targetType) => {
  return [getSourceColumns(sourceType), getTargetColumns(targetType)];
};

/** Get columns and dataSource for nodes.
 * @param {Array} dataSource data source
 * @param {Number} sourceType source type value
 * @param {Number} targetType target type value
 * @param {Function} change emit data source changed
 * @returns {Array}
 */
export function getDataSourceAndColumns(...args) {
  const [, sourceType, targetType] = args;

  const dataSource = makeSourceObservable(...args);
  const columns = getColumns(sourceType, targetType);

  return { dataSource, columns };
}