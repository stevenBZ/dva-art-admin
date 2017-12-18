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
    支出: 4000,
    收入: 2400,
    amt: 2400,
  }, {
    name: '12月13日',
    支出: 3000,
    收入: 1398,
    amt: 2210,
  }, {
    name: '12月14日',
    支出: 2000,
    收入: 9800,
    amt: 2290
  }, {
    name: '12月15日',
    支出: 2780,
    收入: 3908,
    amt: 2000,
  }, {
    name: '12月16日',
    支出: 1890,
    收入: 4800,
    amt: 2181,
  }, {
    name: '12月17日',
    支出: 2390,
    收入: 3800,
    amt: 2500,
  }, {
    name: '12月18日',
    支出: 3490,
    收入: 4300,
    amt: 2100,
  },
]

const data1 = [
  {
    name: '5月',
    支出: 34000,
    收入: 99000,
    amt: 2400,
  }, {
    name: '6月',
    支出: 33000,
    收入: 76000,
    amt: 2210,
  }, {
    name: '7月',
    支出: 22000,
    收入: 105000,
    amt: 2290,
  }, {
    name: '8月',
    支出: 22780,
    收入: 114000,
    amt: 2000,
  }, {
    name: '9月',
    支出: 41890,
    收入: 125000,
    amt: 2181,
  }, {
    name: '10月',
    支出: 22390,
    收入: 97000,
    amt: 2500,
  }, {
    name: '11月',
    支出: 33490,
    收入: 98000,
    amt: 2100,
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
        dataKey="收入"
        stroke="#8884d8"
        activeDot={{
          r: 8,
        }}
      />
       <Line type="monotone"
        dataKey="支出"
        stroke="#86c166"
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
        dataKey="收入"
        stroke="#8884d8"
        activeDot={{
          r: 8,
        }}
      />
      <Line type="monotone"
        dataKey="支出"
        stroke="#86c166"
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
        <Card title="日财务报表">
          <SimpleLineChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="月财务报表">
          <DashedLineChart />
        </Card>
      </Col>
    </Row>
  </div>
)

export default LineChartPage
