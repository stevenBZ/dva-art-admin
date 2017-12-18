import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect,routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm,Menu } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import dynamic from 'dva/dynamic'
import { Link } from 'react-router-dom'
import SubNav from './SubNav'


const Daily = ({ children,location, dispatch, daily, loading }) => {
  const subNavProps={
    selectedKeys:'classRecords',
  }

  return (
    <Page inner>
        <SubNav {...subNavProps}/>
    </Page>
  )
}

Daily.propTypes = {
  daily: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ daily, loading }) => ({ daily, loading }))(Daily)
