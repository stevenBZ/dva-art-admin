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


const Courage = ({ location, dispatch, courage, loading }) => {
  location.query = queryString.parse(location.search)
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,input_1Useable,input_2Useable,input_3Useable,} = courage
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    input_1Useable:input_1Useable,
    input_2Useable:input_2Useable,
    input_3Useable:input_3Useable,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['courage/update'],
    title: `${modalType === 'create' ? '创建课程信息' : '更新课程信息'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log('modalType的值是，',modalType)
    },
    onCancel () {
      dispatch({
        type: 'courage/hideModal',
      })
    },
    onUseInput1(){
      dispatch({
        type:'courage/setInput1ToUse'
      })
    },
    onUnuseInput1(){
      dispatch({
        type:'courage/setInput1ToUnuse'
      })
    },
    onUseInput2(){
      dispatch({
        type:'courage/setInput2ToUse'
      })
    },
    onUnuseInput2(){
      dispatch({
        type:'courage/setInput2ToUnuse'
      })
    },
    onUseInput3(){
      dispatch({
        type:'courage/setInput3ToUse'
      })
    },
    onUnuseInput3(){
      dispatch({
        type:'courage/setInput3ToUnuse'
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['courage/query'],
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
        type: 'courage/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'courage/showModal',
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
          type: 'courage/updateState',
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
        pathname: '/courage',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/courage',
      }))
    },
    onAdd () {
      dispatch({
        type: 'courage/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'courage/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'courage/multiDelete',
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

Courage.propTypes = {
  courage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ courage, loading }) => ({ courage, loading }))(Courage)
