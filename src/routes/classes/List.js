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
      title: '班级名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
    }, 
    {
      title: '教师',
      dataIndex: 'teacher',
      key: 'teacher',
    }, {
      title: '学生数量',
      dataIndex: 'nowStudentNumber',
      key: 'nowStudentNumber',
    }, 
    {
      title:'学生容量',
      dataIndex:'maxStudentNumber',
      key:'maxStudentNumber',
    },
    {
      title:'已上课次',
      dataIndex:'usedClassTime',
      key:'usedClassTime',
    },
    {
      title:'已排课次',
      dataIndex:'maxClassTime',
      key:'maxClassTime',
    },
    {
      title: '已授课时',
      dataIndex:'usedClassHour',
      key: 'usedClassHour',
    },
    {
      title:'结业',
      dataIndex: 'isFinished',
      key: 'isFinished',
      render: text => (<span>{text
        ? '是'
        : '否'}</span>),
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' },{ key: '3', name: '结业' }]} />
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
