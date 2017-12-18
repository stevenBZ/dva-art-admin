import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '老师姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
    }, 
    {
      title: '性别',
      dataIndex: 'isMale',
      key: 'isMale',
      render: text => (<span>{text
        ? '男'
        : '女'}</span>),
    }, {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    }, 
    {
      title:'科目',
      dataIndex:'subject',
      key:'subject',
    },
    {
      title:'上月课时',
      dataIndex:'lastMonthHour',
      key:'lastMonthHour',
    },
    {
      title:'本月课时',
      dataIndex:'thisMonthHour',
      key:'thisMonthHour',
    },
    {
      title: '启用状态',
      dataIndex:'useState',
      key: 'useState',
      width: 100,
      render: text => {return (text?<Switch defaultChecked={true}/>:<Switch defaultChecked={false} />)},
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 800 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
