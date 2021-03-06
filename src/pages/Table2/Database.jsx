import React from 'react';

import Table from './Table';
import Observer from './Observer';

import Custom from './WithComponent';

import { DatabaseColumns } from './columns';

import { Provider } from './context';

import { useObservable } from './utils';

function useColumns() {
  return React.useMemo(() => {
    return JSON.parse(JSON.stringify(DatabaseColumns));
  }, []);
}

const Source = (props) => {
  const columns = useColumns();

  return (
    <Table columns={columns} rowKey="$$key" {...props}>
      <Observer dataIndex="name" component={Custom.Content} />
      <Observer dataIndex="type" component={Custom.Content} />
    </Table>
  );
};

const Target = ({ options, ...props }) => {
  const columns = useColumns();
  const ctxValue = useObservable(options);

  return (
    <Provider value={ctxValue}>
      <Table columns={columns} rowKey="$$key" {...props}>
        <Observer dataIndex="name" component={Custom.Select} allowFilter />
        <Observer dataIndex="type" component={Custom.Content} />
      </Table>
    </Provider>
  );
};

const Database = { Source, Target };

export default Database;
