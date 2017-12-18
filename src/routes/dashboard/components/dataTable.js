import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {Table} from 'antd'

function DataTable ({ data }) {
    const columns = [{
        title: '机构实收',
        dataIndex: 'income',
        key: 'income',
      }, {
        title: '工资支出',
        dataIndex: 'expense',
        key: 'expense',
      }, {
        title: '授课课时',
        dataIndex: 'couragehour',
        key: 'couragehour',
      }, {
        title: '缺课人次',
        dataIndex: 'absent',
        key: 'absent',
      }];
    return(<div>
        <h3>机构运营数据（本月）</h3>
        <Table dataSource={data} columns={columns} pagination={false}/>
    </div>)
}

export default DataTable;