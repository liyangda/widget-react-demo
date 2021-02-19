import React from 'react';

import { Input, Select } from 'antd';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import { useContext } from './context';

const WithContent = ({ value }) => value;

const WithSelect = observer(({ onChange, ...props }) => {
  const options = useContext();
  const previous = React.useRef();
  const change = React.useCallback((value, option) => {
    onChange(value);

    if (previous.current) {
      runInAction(() => {
        previous.current.disabled = false;
      });
    }
    previous.current = options[option.index];
    runInAction(() => {
      previous.current.disabled = true;
    });
  }, [options, onChange]);

  const filterOption = React.useCallback((inputValue, option) => {
    return !option.disabled;
  }, []);

  return <Select options={options} filterOption={filterOption} onChange={change} {...props} />;
});

const WithInput = ({ onChange, ...props }) => {
  const change = React.useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  return <Input onChange={change} {...props} />;
};

const WithComponent = {
  Content: WithContent,
  Input: WithInput,
  Select: WithSelect,
};

export default WithComponent;