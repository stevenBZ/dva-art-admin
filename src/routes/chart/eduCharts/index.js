import React from 'react'
import { Radio } from 'antd'
import ReChartsComponent from './ReChartsComponent'
import styles from './index.less'

const RadioGroup = Radio.Group

const chartList = [
  {
    label: '线形图',
    value: 'lineChart',
  },
  {
    label: '柱状图',
    value: 'barChart',
  },
  {
    label: '面积图',
    value: 'areaChart',
  },
]

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
      type: '',
    }
    this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this)
  }
  handleRadioGroupChange (e) {
    this.setState({
      type: e.target.value,
    })
  }
  render () {
    return (<div className="content-inner">
      <RadioGroup options={chartList} defaultValue="lineChart" onChange={this.handleRadioGroupChange} />
      <div className={styles.chart}>
        <ReChartsComponent type={this.state.type} />
      </div>
    </div>)
  }
}


export default Chart
