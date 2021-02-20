import React from 'react';

import Database from './Database';
import Kafka from './Kafka';
import Layout from './Layout';

import { database2kafka, kafka2database, toAutorun, toObservable, runInAction } from './utils';

import { DATABASE_DATABASE, DATABASE_KAFKA, KAFKA_DATABASE } from './constant';

function toMap(source, target, key) {
  return source.reduce((acc, cur, index) => ({ ...acc, [cur[key]]: { source: cur, target: target[index] } }), {});
}

function useDatabase2Database(dataSource, defaultValue) {
  const isMounted = React.useRef();
  const [{ source, target }, setState] = React.useState(() => {
    const { input = [], output = [] } = defaultValue || {};

    const map = toMap(input, output, 'name');

    return dataSource.reduce((acc, cur) => {
      // 获取默认值
      const { source = {}, target = {} } = map[cur.name] || {};

      acc.source.push(toObservable({ key: cur.name, ...cur, ...source }));
      acc.target.push(toObservable({ key: cur.name, ...cur, ...target }));

      return acc;
    }, { source: [], target: [] });
  });

  React.useEffect(() => {
    if (isMounted.current) {
      setState(dataSource.reduce((acc, cur) => {
        const source = toObservable({ key: cur.name, ...cur });
        const target = toObservable({ key: cur.name, ...cur });
  
        acc.source.push(source);
        acc.target.push(target);
  
        return acc;
      }, { source: [], target: [] }));
    }

    isMounted.current = true;
  }, [dataSource]);

  return { source, target };
}

// 针对 database -> kafka , kafka支持自定义输入
function useDatabase2Kafka(dataSource, defaultValue) {
  const isMounted = React.useRef();
  const [{ source, target, custom }, setState] = React.useState(() => {
    const { input = [], output = [] } = defaultValue || {};

    const map = toMap(input, output.slice(0, input.length), 'name');

    const custom = output.slice(input.length);

    return dataSource.reduce((acc, cur) => {
      const transfer = database2kafka(cur);
      // 获取默认值
      const { source = {}, target = {} } = map[cur.name] || {};

      acc.source.push(toObservable({ key: cur.name, ...cur, ...source }));
      acc.target.push(toObservable({ key: transfer.sourcePath, ...transfer, ...target }));

      return acc;
    }, { source: [], target: [], custom });
  });

  React.useEffect(() => {
    if (isMounted.current) {
      setState((prev) => {
        return {
          ...prev,
          ...dataSource.reduce((acc, cur) => {
            const transfer = database2kafka(cur);
      
            acc.source.push(toObservable({ key: cur.name, ...cur }));
            acc.target.push(toObservable({ key: transfer.sourcePath, ...transfer }));
      
            return acc;
          }, { source: [], target: [] }),
        }
      });
    }

    isMounted.current = true;
  }, [dataSource]);

  return { source, target, custom };
}

function useKafka2Database(dataSource, defaultValue) {
  const isMounted = React.useRef();
  const dispose = React.useRef();

  const [{ source, target }, setState] = React.useState(() => {
    const { input = [], output = [] } = defaultValue || {};

    const map = toMap(input, output, 'sourcePath');

    const { source, target, ...rest } = dataSource.reduce((acc, cur) => {
      const transfer = kafka2database(cur);
      // 获取默认值
      const defaultValue = map[cur.name] || {};
      const source = toObservable({ key: cur.sourcePath, ...cur, ...defaultValue.source });
      const target = toObservable({ key: transfer.name, ...transfer, ...defaultValue.target });

      const dispose = toAutorun(() => {
        const flag = /(date|time)/.test(target.type);
        runInAction(() => {
          source.format = flag ? ( source.format || ' ') : '';
        });
      });

      acc.source.push(source);
      acc.target.push(target);
      acc.dispose.push(dispose);

      return acc;
    }, { source: [], target: [], dispose: [] });

    dispose.current = rest.dispose;

    return { source, target };
  });

  React.useEffect(() => {
    if (isMounted.current) {
      const { source, target, ...rest } = dataSource.reduce((acc, cur) => {
        const source = toObservable(cur);
        const target = toObservable(kafka2database(cur));
  
        const dispose = toAutorun(() => {
          const flag = /(date|time)/.test(target.type);
          runInAction(() => {
            source.format = flag ? ( source.format || ' ') : '';
          });
        });
  
        acc.source.push(source);
        acc.target.push(target);
        acc.dispose.push(dispose);
  
        return acc;
      }, { source: [], target: [], dispose: [] });
  
      dispose.current = rest.dispose;

      setState({ source, target });
    }

    isMounted.current = true;
  }, [dataSource]);

  React.useEffect(() => () => dispose.current && dispose.current.forEach((fn) => fn()), []);

  return { source, target };
}

export const Database2Database = ({ dataSource, defaultValue, options }) => {
  const { source, target } = useDatabase2Database(dataSource, defaultValue);

  return (
    <Layout>
      <Database.Source dataSource={source} />
      <Database.Target dataSource={target} options={options} />
    </Layout>
  );
};

export const Database2Kafka = ({ dataSource, defaultValue }) => {
  const { source, target, custom } = useDatabase2Kafka(dataSource, defaultValue);

  return (
    <Layout>
      <Database.Source dataSource={source} />
      <Kafka.Target dataSource={target} />
    </Layout>
  );
};

export const Kafka2Database = ({ dataSource, defaultValue, format, options }) => {
  const { source, target } = useKafka2Database(dataSource);

  return (
    <Layout>
      <Kafka.Source dataSource={source} options={format} />
      <Database.Target dataSource={target} options={options} />
    </Layout>
  );
};

const Compose = ({ type, ...props }) => {
  const calcType = React.useMemo(() => {
    if (Array.isArray) {
      return type.reduce((acc, cur) => acc + String(cur).charAt(0), '');
    }

    return type;
  }, [type]);

  switch (calcType) {
    case DATABASE_DATABASE:
      return <Database2Database {...props} />;
    case DATABASE_KAFKA:
      return <Database2Kafka {...props} />;
    case KAFKA_DATABASE:
      return <Kafka2Database {...props} />;
    default:
      return null;
  }
};

export default Compose;
