import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Button } from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import Container from './Container'

const data = [
  {
    name: '12月12日',
    授课课时: 23,
  }, {
    name: '12月13日',
    授课课时: 35,
  }, {
    name: '12月14日',
    授课课时: 26,
  }, {
    name: '12月15日',
    授课课时: 27,
  }, {
    name: '12月16日',
    授课课时: 18,
  }, {
    name: '12月17日',
    授课课时: 42,
  }, {
    name: '12月18日',
    授课课时: 12,
  },
]

const data1 = [
  {
    name: '5月',
    出勤率: 0.73,
  }, {
    name: '6月',
    出勤率: 0.76,
  }, {
    name: '7月',
    出勤率: 0.5,
  }, {
    name: '8月',
    出勤率: 0.6,
  }, {
    name: '9月',
    出勤率: 0.7,
  }, {
    name: '10月',
    出勤率: 0.8,
  }, {
    name: '11月',
    出勤率: 0.98,
  },
]

const data2 = [
  {
    name: '5月',
    评分: 4.1,
  }, {
    name: '6月',
    评分: 3.2,
  }, {
    name: '7月',
    评分: 3.5,
  }, {
    name: '8月',
    评分: 3.6,
  }, {
    name: '9月',
    评分: 4.8,
  }, {
    name: '10月',
    评分: 4.1,
  }, {
    name: '11月',
    评分: 3.4,
  },
]

const colProps = {
  lg: 12,
  md: 24,
}

const SimpleLineChart = () => (
  <Container>
    <LineChart data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone"
        dataKey="授课课时"
        stroke="#8884d8"
        activeDot={{
          r: 8,
        }}
      />
    </LineChart>
  </Container>
)

const DashedLineChart = () => (
  <Container>
    <LineChart data={data1}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone"
        dataKey="出勤率"
        stroke="#86c166"
        activeDot={{
          r: 8,
        }}
      />
    </LineChart>
  </Container>
)

const StarLineChart = () => (
  <Container>
    <LineChart data={data2}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone"
        dataKey="评分"
        stroke="#CA7A2C"
        activeDot={{
          r: 8,
        }}
      />
    </LineChart>
  </Container>
)


const LineChartPage = () => (
  <div className="content-inner">
    <Row gutter={32}>
      <Col {...colProps}>
        <Card title="授课课时">
          <SimpleLineChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="学员出勤率">
          <DashedLineChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="家长评分">
          <StarLineChart />
        </Card>
      </Col>
    </Row>
  </div>
)

export default LineChartPage
