import React from 'react';

import { Input, Select } from 'antd';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import { useContext } from './context';

function useFilter(onChange, allowFilter) {
  const options = useContext();
  const previous = React.useRef();
  const change = React.useCallback((value, option) => {
    onChange(value, option);

    if (!allowFilter) return;

    if (previous.current) {
      runInAction(() => {
        previous.current.disabled = false;
      });
    }
    previous.current = options[option.index];
    runInAction(() => {
      previous.current.disabled = true;
    });
  }, [options, allowFilter, onChange]);

  const filterOption = React.useCallback((inputValue, option) => {
    return !option.disabled;
  }, []);

  if (filterOption) return { options, filterOption, onChange: change };

  return { options, onChange: change };
}

const WithContent = ({ value }) => value;

const WithSelect = observer(({ onChange, allowFilter, ...props }) => {
  const selectProps = useFilter(onChange, allowFilter);

  return <Select {...selectProps} {...props} />;
});

const WithInput = ({ onChange, ...props }) => {
  const change = React.useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  return <Input onChange={change} {...props} />;
};

const WithFormat = ({ value, ...props }) => {
  if (value) return <WithSelect {...{ value, ...props }} />;

  return '';
};

const WithComponent = {
  Content: WithContent,
  Input: WithInput,
  Select: WithSelect,
  Format: WithFormat,
};

export default WithComponent;