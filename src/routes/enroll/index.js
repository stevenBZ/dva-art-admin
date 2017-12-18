import React from 'react'
import { connect } from 'dva'
import { Icon ,Steps } from 'antd'
const Step = Steps.Step;
import styles from './index.less'
import Step1 from './Step1'

const EnRoll = ({location,dispatch,enroll,loading}) => {
  const { current } = enroll

  const getCurrentComponent=()=> {
    const componentMap = {
      0: Step1,
      // 1: Step2,
      // 2: Step3,
    };
    return componentMap[current];
  }
  const CurrentComponent = getCurrentComponent()
  return(
    <div>
      <div className={styles.enroll}>
      <Steps  className={styles.steps} current={current}>
        <Step title="学员信息" />
        <Step title="购买项目" />
        <Step title="费用结算" />
      </Steps>
      <CurrentComponent 
       dispatch={dispatch}
      />
      </div>
     
    </div>
  )
}

export default connect(({ enroll, loading }) => ({ enroll, loading }))(EnRoll)