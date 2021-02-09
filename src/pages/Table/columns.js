import React from 'react';

import { observer } from 'mobx-react';

import { Select, Input } from 'antd';

const options = [{ label: 'test', value: 'test' }];
const options2 = [{ label: 'test', value: 'test', type: 'datetime' }];

const ObserverSelect = observer(({ record, dataIndex }) => {
  const { [dataIndex]: value, update } = record;

  const onChange = (value) => update(dataIndex, value);

  return <Select {...{ value, options, onChange }} />;
});

const ObserverSelectWithType = observer(({ record, dataIndex }) => {
  const { [dataIndex]: value, update } = record;

  const onChange = (value, option) => {
    update(dataIndex, value);
    update('type', option.type);
  };

  return <Select {...{ value, options: options2, onChange }} />;
});

const ObserverSelectOrContent = observer(({ record, dataIndex }) => {
  const { [dataIndex]: value, isFormatSelectable, update } = record;

  const onChange = (value) => update(dataIndex, value);

  return isFormatSelectable ? <Select {...{ value, options, onChange }} /> : '';
});

const ObserverInput = observer(({ record, dataIndex }) => {
  const { [dataIndex]: value, update } = record;

  const onChange = (e) => update(dataIndex, e.target.value);

  return <Input {...{ value, onChange }} />;
});

const ObserverContent = observer(({ record, dataIndex }) => {
  const { [dataIndex]: value = '' } = record;

  return value;
});

/** Columns for the source node which type is kafka */
export const KafkaSourceColumns = [
  {
    title: 'name',
    dataIndex: 'sourcePath',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="sourcePath" />,
  },
  {
    title: 'alias',
    dataIndex: 'alias',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="alias" />,
  },
  {
    title: 'format',
    dataIndex: 'format',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverSelectOrContent record={record} dataIndex="format" />,
  },
  {
    title: 'value',
    dataIndex: 'defaultValue',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="defaultValue" />,
  },
];
/** Columns for the source node which type is database */
export const DatabaseSourceColumns = [
  {
    title: 'name',
    dataIndex: 'name',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="name" />,
  },
  {
    title: 'type',
    dataIndex: 'type',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="type" />,
  },
];
/** Columns for the source node which type is standard */
export const StandardSourceColumns = [
  {
    title: 'name',
    dataIndex: 'name',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="name" />,
  },
  {
    title: 'type',
    dataIndex: 'type',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="type" />,
  },
];
/** Columns for the target node which type is kafka */
export const KafkaTargetColumns = [
  {
    title: 'name',
    dataIndex: 'sourcePath',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverSelect record={record} dataIndex="sourcePath" />,
  },
  {
    title: 'alias',
    dataIndex: 'alias',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverInput record={record} dataIndex="alias" />,
  },
  {
    title: 'value',
    dataIndex: 'defaultValue',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="defaultValue" />,
  },
];
/** Columns for the target node which type is database */
export const DatabaseTargetColumns = [
  {
    title: 'name',
    dataIndex: 'name',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverSelectWithType record={record} dataIndex="name" />,
  },
  {
    title: 'type',
    dataIndex: 'type',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="type" />,
  },
];
/** Columns for the target node which type is standard */
export const StandardTargetColumns = [
  {
    title: 'name',
    dataIndex: 'name',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="name" />,
  },
  {
    title: 'type',
    dataIndex: 'type',
    shouldCellUpdate: (curr, prev) => curr === prev,
    render: (text, record) => <ObserverContent record={record} dataIndex="type" />,
  },
];

function collectKeys(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }

  return arr.reduce((acc, { dataIndex }) => ({ [dataIndex]: true, ...acc }), {});
}

/** 源节点类型为Kafka的columns的dataIndex值组 */
export const KafkaSourceColKeys = collectKeys(KafkaSourceColumns);
/** 源节点类型为Database的columns的dataIndex值组 */
export const DatabaseSourceColKeys = collectKeys(DatabaseSourceColumns);
/** 源节点类型为Standard的columns的dataIndex值组 */
export const StandardSourceColKeys = collectKeys(StandardSourceColumns);
/** 目标节点类型为Kafka的columns的dataIndex值组 */
export const KafkaTargetColKeys = collectKeys(KafkaTargetColumns);
/** 目标节点类型为Database的columns的dataIndex值组 */
export const DatabaseTargetColKeys = collectKeys(DatabaseTargetColumns);
/** 目标节点类型为Standard的columns的dataIndex值组 */
export const StandardTargetColKeys = collectKeys(StandardTargetColumns);
