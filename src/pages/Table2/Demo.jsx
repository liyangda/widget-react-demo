import React from 'react';

import Compose from './Compose';

const dataSource = [
  { key: 'key1', name: 'name1', type: 'type1' },
  { key: 'key2', name: 'name2', type: 'type2' },
];

const options = [
  { index: '0', label: 'label0', value: 'value0', type: 'varchar' },
  { index: '1', label: 'label1', value: 'value1', type: 'datetime' },
  { index: '2', label: 'label2', value: 'value2', type: 'timestamp' },
  { index: '3', label: 'label3', value: 'value3', type: 'varchar' },
];

const dataSource2 = [
  { key: 'key1', sourcePath: 'name1', alias: 'type1', defaultValue: 'value1', format: 'format1' },
  { key: 'key2', sourcePath: 'name2', alias: 'type2', defaultValue: 'value2', format: 'format2' },
];

const format = [
  { index: '0', label: 'label0', value: 'value0' },
  { index: '1', label: 'label1', value: 'value1' },
  { index: '2', label: 'label2', value: 'value2' },
];

const Demo = (props) => {
  const ref = React.useRef();

  const onClick = () => {
    const { input, output } = ref.current.collect();

    console.table(input);
    console.table(output);
  };

  return (
    <>
      <Compose type={[101, 102]} ref={ref} {...{ dataSource, options }} />
      {/* <Compose type={[101, 201]} {...{ dataSource, options }} />
      <Compose type={[201, 102]} {...{ dataSource: dataSource2, format, options }} /> */}
      <button onClick={onClick}>Click</button>
    </>
  );
};

export default Demo;
