import React from 'react'
import { Menu } from 'antd'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './SubNav.less'


const SubNav=({selectedKeys,subSelectedKeys})=>{
    return(
      <div>
        <Menu
        selectedKeys={[selectedKeys]}
        mode="horizontal"
        className={classnames({ [styles.menu]: true})}
      >
        <Menu.Item key="classRecords">
          上课记录
          <Link to={'/daily/classRecords'}></Link>
        </Menu.Item>
        <Menu.Item key="absenceRecords">
          缺课记录
          <Link to={'/daily/absenceRecords'}></Link>
        </Menu.Item>
        <Menu.Item key="homeworkRecords">
          课后作业
          <Link to={'/daily/homeworkRecords'}></Link>
        </Menu.Item>
        <Menu.Item key="noticeRecords">
          通知记录
          <Link to={'/daily/noticeRecords'}></Link>
        </Menu.Item>
        <Menu.Item key="EvaluateRecords">
          师生互评
          <Link to={'/daily/studentEvaluateRecords'}></Link>
        </Menu.Item>
      </Menu>
       {
        subSelectedKeys&&
        <Menu
        selectedKeys={[subSelectedKeys]}
        mode="horizontal"
        className={classnames({ [styles.menu]: true})}
        >
          <Menu.Item key="studentEvaluateRecords">
            评价学生
            <Link to={'/daily/studentEvaluateRecords'}></Link>
          </Menu.Item>
          <Menu.Item key="teacherEvaluateRecords">
            评价老师
            <Link to={'/daily/teacherEvaluateRecords'}></Link>
          </Menu.Item>
        </Menu>
      }
      </div>
  )
}

export default SubNav