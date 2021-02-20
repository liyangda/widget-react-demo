import React from 'react';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

const Observer = ({ dataIndex, record, component: Component, ...props }) => {
  const { [dataIndex]: value } = record || {};

  const onChange = React.useCallback((value, option) => {
    runInAction(() => {
      record[dataIndex] = value;

      if (option.type) {
        record.type = option.type;
      }
    });
  }, [record, dataIndex]);

  return <Component value={value} onChange={onChange} {...props} />;
};

export default observer(Observer);
