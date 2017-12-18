import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import SubNav from '../SubNav'



const StudentEvaluateRecord = ({ location, dispatch, studentEvaluateRecord, loading }) => {
  location.query = queryString.parse(location.search)
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys} = studentEvaluateRecord
  const { pageSize } = pagination
  
  const SubNavProps={
    selectedKeys:'EvaluateRecords',
    subSelectedKeys:'studentEvaluateRecords'
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['studentEvaluateRecord/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'studentEvaluateRecord/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'studentEvaluateRecord/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'studentEvaluateRecord/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/studentEvaluateRecord',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/studentEvaluateRecord',
      }))
    },
    onAdd () {
      dispatch({
        type: 'studentEvaluateRecord/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'studentEvaluateRecord/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'studentEvaluateRecord/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <Page inner>
      <SubNav {...SubNavProps}/>
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title={'Are you sure delete these items?'} placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" size="large" style={{ marginLeft: 8 }}>Remove</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
    </Page>
  )
}

StudentEvaluateRecord.propTypes = {
  studentEvaluateRecord: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ studentEvaluateRecord, loading }) => ({ studentEvaluateRecord, loading }))(StudentEvaluateRecord)
