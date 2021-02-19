import React from 'react';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

const Observer = ({ dataIndex, record, component: Component, ...props }) => {
  const { [dataIndex]: value } = record || {};

  const onChange = React.useCallback((value) => {
    runInAction(() => {
      record[dataIndex] = value;
    });
  }, [record, dataIndex]);

  return <Component value={value} onChange={onChange} />;
};

export default observer(Observer);
