import React from 'react';

import { useBoolean, useDebounceFn, useDebounceEffect } from 'ahooks';

import { Row, Col, Table } from 'antd';

import { useTable } from './hooks';

import { toJS } from 'mobx';

const defaultProps = { pagination: false, rowKey: 'key' };

export function useFilterTable({ onChange, ...props }) {
  // 通过togggle变化，触发监听
  const [state, { toggle }] = useBoolean();

  const { run: change } = useDebounceFn(toggle, { wait: 100 });

  const [leftTableProps, rightTableProps] = useTable({ ...props, change });

  useDebounceEffect(
    () => {
      if (typeof onChange !== 'function') return;

      const { rowSelection: { selectedRowKeys = [] } = {} } = leftTableProps || {};
      const { dataSource } = rightTableProps || {};

      const result = leftTableProps.dataSource.reduce(
        (acc, cur, index) => {
          if (selectedRowKeys.includes(cur.key)) {
            acc.inputFormat.push(toJS(cur));
            acc.outputFormat.push(toJS(dataSource[index]));
          }

          return acc;
        },
        { inputFormat: [], outputFormat: [] },
      );
      
      onChange(result);
    },
    [state, leftTableProps.rowSelection.selectedRowKeys],
    { wait: 300 },
  );

  return [leftTableProps, rightTableProps];
}

export function useFilter(props) {
  const [leftTableProps, rightTableProps] = useFilterTable(props);

  const LeftTable = React.useMemo(() => <Table {...defaultProps} {...leftTableProps} />, [leftTableProps]);
  
  const RightTable = React.useMemo(() => <Table {...defaultProps} {...rightTableProps} />, [rightTableProps]);

  return [LeftTable, RightTable];
}

function FilterTable(props) {
  const [leftTableProps, rightTableProps] = useFilterTable(props);

  return (
    <Row>
      <Col span={11}><Table {...defaultProps} {...leftTableProps} /></Col>
      <Col span={2}></Col>
      <Col span={11}><Table {...defaultProps} {...rightTableProps} /></Col>
    </Row>
  );
};

export default FilterTable;
