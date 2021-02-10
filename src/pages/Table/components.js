import React from 'react';

import { observer } from 'mobx-react';

import { Select, Input } from 'antd';

const options = [{ label: 'test', value: 'test' }];
const options2 = [{ label: 'test', value: 'test', type: 'datetime' }];

function useInput(state) {
  const [value, setValue] = React.useState(state);

  React.useEffect(() => {
    setValue(state);
  }, [state]);

  const onChange = React.useCallback((e) => setValue(e.target.value), []);

  return { value, onChange };
}

export const ObserverSelect = observer(({ record, dataIndex }) => {
  const { [dataIndex]: value, update } = record;

  const onChange = (value) => update(dataIndex, value);

  return <Select {...{ value, options, onChange }} />;
});

export const ObserverSelectWithType = observer(({ record, dataIndex }) => {
  const { [dataIndex]: value, update } = record;

  const onChange = (value, option) => {
    update(dataIndex, value);
    update('type', option.type);
  };

  return <Select {...{ value, options: options2, onChange }} />;
});

export const ObserverSelectOrContent = observer(({ record, dataIndex }) => {
  const { [dataIndex]: value, isFormatSelectable, update } = record;

  const onChange = (value) => update(dataIndex, value);

  return isFormatSelectable ? <Select {...{ value, options, onChange }} /> : '';
});

export const ObserverInput = observer(({ record, dataIndex }) => {
  const previous = React.useRef(record[dataIndex] || '');
  const props = useInput(record[dataIndex]);

  const onBlur = (e) => {
    const { value } = e.target;

    if (previous.current === value) return;
    
    previous.current = value;
    record.update(dataIndex, value);
  };

  return <Input {...props} onBlur={onBlur} />;
});

export const ObserverContent = observer(({ record, dataIndex }) => {
  const { [dataIndex]: value = '' } = record;

  return value;
});