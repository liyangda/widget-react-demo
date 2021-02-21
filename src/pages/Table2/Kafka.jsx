import React from 'react';

import Table, { Summary } from './Table';
import Observer from './Observer';

import Custom from './WithComponent';

import { KafkaColumns } from './columns';

import { Provider } from './context';

import { useFreeze, useObservable } from './utils';

function summary(custom) {
  return custom.map((item) => {
    return (
      <Summary.Row>
        <Summary.Cell />
        {KafkaColumns.map((col) => {
          const onChange = (e) => {
            item[col.dataIndex] = e.target.value;
          };

          return <Summary.Cell><Custom.Input value={item[col.dataIndex]} onChange={onChange} /></Summary.Cell>
        })}
      </Summary.Row>
    );
  });
}

function useColumns() {
  return React.useMemo(() => {
    return JSON.parse(JSON.stringify(KafkaColumns));
  }, []);
}

const Source = ({ options, ...props }) => {
  const columns = useColumns();
  const ctxValue = useFreeze(options);

  return (
    <Provider value={ctxValue}>
      <Table columns={columns} rowKey="$$key" {...props}>
        <Observer dataIndex="sourcePath" component={Custom.Content} />
        <Observer dataIndex="alias" component={Custom.Content} />
        <Observer dataIndex="format" component={Custom.Format} />
        <Observer dataIndex="defaultValue" component={Custom.Content} />
      </Table>
    </Provider>
  );
};

const Target = ({ options, ...props }) => {
  const columns = useColumns();
  const ctxValue = useObservable(options);

  return (
    <Provider value={ctxValue}>
      <Table columns={columns} rowKey="$$key" {...props}>
        <Observer dataIndex="sourcePath" component={Custom.Content} />
        <Observer dataIndex="alias" component={Custom.Input} />
        <Observer dataIndex="format" component={Custom.Content} />
        <Observer dataIndex="defaultValue" component={Custom.Content} />
      </Table>
    </Provider>
  );
};

const Kafka = { Source, Target };

export default Kafka;
