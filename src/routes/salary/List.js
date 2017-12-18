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
      title: '结算日期',
      dataIndex: 'time',
      key: 'time',
    }, 
    {
      title: '结算内容',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '结算金额',
      dataIndex: 'money',
      key: 'money',
    }, 
    {
      title:'结算区间',
      dataIndex:'startAndEndTime',
      key:'startAndEndTime',
    },
    {
      title:'结算对象',
      dataIndex:'teachers',
      key:'teachers',
    },
    {
      title:'结算人',
      dataIndex:'writer',
      key:'writer',
    },
    {
      title: '状态',
      dataIndex:'confirmState',
      key: 'confirmState',
      width: 100,
      render: text => (<span>{text
        ? '已确认'
        : '未确认'}</span>),
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
