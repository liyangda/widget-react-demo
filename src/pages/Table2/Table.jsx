import React from 'react';

import { Table } from 'antd';

function useChildren(children, columns) {
  // 将children以dataIndex为key，转成map缓存
  const map = React.useMemo(() => {
    const map = Object.create(null);

    React.Children.forEach(children, (child) => {
      const { props: { dataIndex } } = child;
  
      if (dataIndex) {
        map[dataIndex] = child;
      }
    });

    return map;
  }, [children]);

  return React.useMemo(() => {
    columns.forEach((col) => {
      if (map[col.dataIndex] && !col.render) {
        col.shouldCellUpdate = (prev, curr) => curr !== prev;
        col.render = (text, record) => React.cloneElement(map[col.dataIndex], { text, record });
      }
    });

    return columns;
  }, [map, columns]);
}

const WrapperTable = ({ children, columns, ...props }) => {
  const cols = useChildren(children, columns);

  return <Table pagination={false} {...{ columns: cols, ...props }} />;
};

export default React.memo(WrapperTable);

const Summary = Table.Summary;

export { Summary };
