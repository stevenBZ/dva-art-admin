import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const AuthorityManage = ({ location, dispatch, authorityManage, loading }) => {
  location.query = queryString.parse(location.search)
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys} = authorityManage
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['authorityManage/update'],
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log('modalType的值是，',modalType)
    },
    onCancel () {
      dispatch({
        type: 'authorityManage/hideModal',
      })
    },
    onUseInput1(){
      dispatch({
        type:'authorityManage/setInput1ToUse'
      })
    },
    onUnuseInput1(){
      dispatch({
        type:'authorityManage/setInput1ToUnuse'
      })
    },
    onUseInput2(){
      dispatch({
        type:'authorityManage/setInput2ToUse'
      })
    },
    onUnuseInput2(){
      dispatch({
        type:'authorityManage/setInput2ToUnuse'
      })
    },
    onUseInput3(){
      dispatch({
        type:'authorityManage/setInput3ToUse'
      })
    },
    onUnuseInput3(){
      dispatch({
        type:'authorityManage/setInput3ToUnuse'
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['authorityManage/query'],
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
        type: 'authorityManage/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'authorityManage/showModal',
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
          type: 'authorityManage/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    plainOptions: [
      { label: '一对一', value: 'OneToOne' },
      { label: '一对多', value: 'OneToMul' },
      { label: '停用', value: 'StopUse' },
      { label: '启用', value: 'StartUse' },      
    ],
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
        pathname: '/authorityManage',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/authorityManage',
      }))
    },
    onAdd () {
      dispatch({
        type: 'authorityManage/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'authorityManage/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'authorityManage/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <Page inner>
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
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

AuthorityManage.propTypes = {
  authorityManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ authorityManage, loading }) => ({ authorityManage, loading }))(AuthorityManage)
