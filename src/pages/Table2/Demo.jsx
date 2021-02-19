import React from 'react';

import { observable } from 'mobx';

import Database from './Database';
import Layout from './Layout';

const dataSource = [
  observable({ key: 'key1', name: 'name1', type: 'type1' }),
  observable({ key: 'key2', name: 'name2', type: 'type2' }),
];

const options = [
  observable({ index: '0', label: 'label0', value: 'value0' }),
  observable({ index: '1', label: 'label1', value: 'value1' }),
  observable({ index: '2', label: 'label2', value: 'value2' }),
  observable({ index: '3', label: 'label3', value: 'value3' }),
];

const Demo = (props) => {
  return (
    <Layout>
      <Database.Source {...{ dataSource }} />
      <Database.Target {...{ options, dataSource }} />
    </Layout>
  );
};

export default Demo;
