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
      title: '学员姓名',
      dataIndex: 'name',
      key: 'name',
    }, 
    {
      title: '性别',
      dataIndex: 'isMale',
      key: 'isMale',
      render: text => (<span>{text
        ? '男'
        : '女'}</span>),
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, 
    {
      title:'点名时间',
      dataIndex: 'rollCallTime',
      key: 'rollCallTime',
    },
    {
      title:'所在班级',
      dataIndex:'className',
      key:'className',
    },
    {
      title:'教师',
      dataIndex:'teacher',
      key:'teacher',
    },
    {
      title:'课时',
      dataIndex:'classHour',
      key:'classHour',
    },
    {
      title: '补课状态',
      dataIndex: 'makeupState',
      key: 'makeupState',
      render: text => (<span>{text
        ? '已补课'
        : '未补课'}</span>),
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
        scroll={{ x: 1250 }}
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
