import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    }, {
      path: '/user',
      models: () => [import('./models/user')],
      component: () => import('./routes/user/'),
    }, {
      path: '/user/:id',
      models: () => [import('./models/user/detail')],
      component: () => import('./routes/user/detail/'),
    }, {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      path: '/request',
      component: () => import('./routes/request/'),
    }, {
      path: '/UIElement/iconfont',
      component: () => import('./routes/UIElement/iconfont/'),
    }, {
      path: '/UIElement/search',
      component: () => import('./routes/UIElement/search/'),
    }, {
      path: '/UIElement/dropOption',
      component: () => import('./routes/UIElement/dropOption/'),
    }, {
      path: '/UIElement/layer',
      component: () => import('./routes/UIElement/layer/'),
    }, {
      path: '/UIElement/dataTable',
      component: () => import('./routes/UIElement/dataTable/'),
    }, {
      path: '/UIElement/editor',
      component: () => import('./routes/UIElement/editor/'),
    }, {
      path: '/chart/ECharts',
      component: () => import('./routes/chart/ECharts/'),
    }, {
      path: '/chart/highCharts',
      component: () => import('./routes/chart/highCharts/'),
    }, {
      path: '/chart/financeCharts',
      component: () => import('./routes/chart/financeCharts/'),
    }, 
    {
      path: '/chart/eduCharts',
      component: () => import('./routes/chart/eduCharts/'),
    },
    {
      path: '/post',
      models: () => [import('./models/post')],
      component: () => import('./routes/post/'),
    },
    {
      path: '/courage',
      models: () => [import('./models/courage')],
      component: () => import('./routes/courage/'),
    },
    {
      path: '/classes',
      models: () => [import('./models/classes')],
      component: () => import('./routes/classes/'),
    },
    {
      path: '/daily/classRecords',
      models: () => [import('./models/daily/classRecord')],
      component: () => import('./routes/daily/classRecord/'),
    },
    {
      path: '/daily/absenceRecords',
      models: () => [import('./models/daily/absenceRecord')],
      component: () => import('./routes/daily/absenceRecord/'),
    },
    {
      path: '/daily/homeworkRecords',
      models: () => [import('./models/daily/homeworkRecord')],
      component: () => import('./routes/daily/homeworkRecord/'),
    },
    {
      path: '/daily/noticeRecords',
      models: () => [import('./models/daily/noticeRecord')],
      component: () => import('./routes/daily/noticeRecord/'),
    },
    {
      path: '/daily/studentEvaluateRecords',
      models: () => [import('./models/daily/studentEvaluateRecord')],
      component: () => import('./routes/daily/studentEvaluateRecord/'),
    },
    {
      path: '/daily/teacherEvaluateRecords',
      models: () => [import('./models/daily/teacherEvaluateRecord')],
      component: () => import('./routes/daily/teacherEvaluateRecord/'),
    },
    {
      path: '/enroll',
      models: () => [import('./models/enroll')],
      component: () => import('./routes/enroll/'),
    },
    {
      path: '/salary',
      models: () => [import('./models/salary')],
      component: () => import('./routes/salary/'),
    },
    {
      path: '/student/studyingStudents',
      models: () => [import('./models/student/studyingStudent')],
      component: () => import('./routes/student/studyingStudent/'),
    },
    {
      path: '/student/potentialStudents',
      models: () => [import('./models/student/potentialStudent')],
      component: () => import('./routes/student/potentialStudent/'),
    },
    {
      path: '/student/historyStudents',
      models: () => [import('./models/student/historyStudent')],
      component: () => import('./routes/student/historyStudent/'),
    },
    {
      path: '/renewWarnings',
      models: () => [import('./models/renewWarning')],
      component: () => import('./routes/renewWarning/'),
    },
    {
      path: '/authorityManage',
      models: () => [import('./models/authorityManage')],
      component: () => import('./routes/autorityManage/'),
    },
   
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
