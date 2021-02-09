import React from 'react';

import { extendObservable, isObservableProp } from 'mobx';

import { getDataSourceAndColumns } from './utils';

/** Update or extend the observable object. 
 * @param {Observable} item A observable object.
 * @param {Object} obj A target object for update or extend.
 */
function extendOrUpdate(item, obj) {
  extendObservable(
    item,
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (isObservableProp(item, key)) {
        item.update(key, value);
      } else {
        acc[key] = value;
      }

      return acc;
    }, {}),
  );
}

/** Collect the checked keys.
 * @param {Array} arr Target array to collect
 */
function collectCheckedKeys(arr) {
  if (!Array.isArray(arr)) return [];

  // eslint-disable-next-line no-sequences
  return arr.reduce((acc, cur) => (cur.checked && acc.push(cur.key), acc), []);
}

/** Set default value
 * @param {Array} dataSource table data source.
 * @param {Object} value default value.
 * 
 * @returns {Array} [source{Array}, target{Array}, rest{Array}]
 * 
 * @description source and target each item is observable object.
 */
export function useDefaultValue(dataSource, value) {
  const [state] = React.useState(value);

  const result = React.useMemo(() => {
    const { inputFormat = [], outputFormat = [] } = state || {};

    const rest = outputFormat.splice(inputFormat.length);

    const temp = inputFormat.reduce((acc, cur, index) => ({
      [cur.name || cur.sourcePath]: [cur, index],
      ...acc,
    }), {});

    const [left, right] = dataSource;

    left.forEach((item, index) => {
      const key = item.name || item.sourcePath;

      if (temp[key]) {
        const [extend, idx] = temp[key];

        extendOrUpdate(item, { ...extend, checked: true });
        extendOrUpdate(right[index], { ...outputFormat[idx], checked: true });
      }
    });

    return [left, right, rest];
  }, [dataSource, state]);

  return result;
}

/** Generate table props for source and target node.
 * @param {Array} dataSource table data source.
 * @param {Object} defaultValue default value.
 * @param {Number} sourceType Type value of source node.
 * @param {Number} targetType Type value of target node.
 * @param {Function} change Emit the change of data source.
 * 
 * @returns {Array} [
 *                    source: { dataSource, columns, rowSelection },
 *                    target: { dataSource, columns, rowSelection },
 *                    rest{Array}
 *                  ]
 * 
 * @description dataSource each item is observable object.
 */
export function useTable({ dataSource, defaultValue, sourceType, targetType, change }) {
  // calculate dataSource and columns
  const {
    dataSource: source,
    columns: [sourceCols, targetCols],
  } = React.useMemo(() => {
    const args = [dataSource, sourceType, targetType, change];

    return getDataSourceAndColumns(...args);
  }, [dataSource, sourceType, targetType, change]);

  // set default value
  const [sourceData, targetData, rest] = useDefaultValue(source, defaultValue);

  // get selected keys
  const [selectedRowKeys, setSelectedRowKeys] = React.useState(collectCheckedKeys(sourceData));

  // rowSelection for source node
  const sourceRowSelection = React.useMemo(() => ({
    selectedRowKeys,
    onChange: (...args) => setSelectedRowKeys(...args),
    getCheckboxProps: () => ({ disabled: false }),
  }), [selectedRowKeys]);
  // rowSelection for source node
  const targetRowSelection = React.useMemo(() => ({
    selectedRowKeys,
    getCheckboxProps: () => ({ disabled: true }),
  }), [selectedRowKeys]);

  // effect when sourceData changed
  React.useEffect(() => setSelectedRowKeys(collectCheckedKeys(sourceData)), [sourceData]);

  return [
    {
      dataSource: sourceData,
      columns: sourceCols,
      rowSelection: sourceRowSelection,
    },
    {
      dataSource: targetData,
      columns: targetCols,
      rowSelection: targetRowSelection,
    },
    rest,
  ];
}
