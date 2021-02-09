import React from 'react';

import { Typography } from 'antd';

import Table from '../Table';

import { getMockData } from '../Table/mock';

const onChange = ({ inputFormat, outputFormat }) => {
  console.table(inputFormat);
  console.table(outputFormat);
};

const Comp = () => {
  return (
    <Typography>
      <Typography.Title>Kafka -> Database</Typography.Title>
      <Typography.Paragraph>
        <Table {...{ ...getMockData(201, 101), onChange }} />
      </Typography.Paragraph>
      <Typography.Title>Kafka -> Standard</Typography.Title>
      <Typography.Paragraph>
        <Table {...{ ...getMockData(201, 301), onChange }} />
      </Typography.Paragraph>
      <Typography.Title>Database -> Kafka</Typography.Title>
      <Typography.Paragraph>
        <Table {...{ ...getMockData(101, 201), onChange }} />
      </Typography.Paragraph>
      <Typography.Title>Database -> Standard</Typography.Title>
      <Typography.Paragraph>
        <Table {...{ ...getMockData(101, 301), onChange }} />
      </Typography.Paragraph>
      <Typography.Title>Database -> Database</Typography.Title>
      <Typography.Paragraph>
        <Table {...{ ...getMockData(101, 101), onChange }} />
      </Typography.Paragraph>
      <Typography.Title>Standard -> Database</Typography.Title>
      <Typography.Paragraph>
        <Table {...{ ...getMockData(301, 101), onChange }} />
      </Typography.Paragraph>
      <Typography.Title>Standard -> Kafka</Typography.Title>
      <Typography.Paragraph>
        <Table {...{ ...getMockData(301, 201), onChange }} />
      </Typography.Paragraph>
    </Typography>
  );
};

export default Comp;
