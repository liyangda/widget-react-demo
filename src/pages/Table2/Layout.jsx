import React from 'react';

import { Col, Row } from 'antd';

const Layout = ({ children }) => {
  const [left, right] = React.Children.toArray(children);

  return (
    <Row>
      <Col span={11}>{left}</Col>
      <Col span={2} />
      <Col span={11}>{right}</Col>
    </Row>
  );
};

export default Layout;
