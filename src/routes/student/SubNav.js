import React from 'react'
import { Menu } from 'antd'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './SubNav.less'


const SubNav=({selectedKeys})=>{
    return(
        <Menu
        selectedKeys={[selectedKeys]}
        mode="horizontal"
        className={classnames({ [styles.menu]: true})}
      >
        <Menu.Item key="studyingStudent">
          在读学生
          <Link to={'/student/studyingStudents'}></Link>
        </Menu.Item>
        <Menu.Item key="potentialStudent">
          潜在学生
          <Link to={'/student/potentialStudents'}></Link>
        </Menu.Item>
        <Menu.Item key="historyStudent">
          历史学生
          <Link to={'/student/historyStudents'}></Link>
        </Menu.Item>
      </Menu>
    )
}

export default SubNav