import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch,Row,Col} from 'antd'
import city from '../../utils/city'
import classnames from 'classnames'
import styles from './Modal.less'

const FormItem = Form.Item
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  let {input_1Useable,onUseInput1,onUnuseInput1,input_2Useable,onUseInput2,onUnuseInput2,input_3Useable,onUseInput3,onUnuseInput3,}=modalProps
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const switch1=(checked)=>{
      if(checked)
      onUseInput1()
      else
      onUnuseInput1()
  }
  const switch2=(checked)=>{
    if(checked)
    onUseInput2()
    else
    onUnuseInput2()
}
const switch3=(checked)=>{
  if(checked)
  onUseInput3()
  else
  onUnuseInput3()
}

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="课程名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="课程类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('isOneToOne', {
            initialValue: item.isOneToOne,
            rules: [
              {
                required: true,
                type: 'boolean',
              },
            ],
          })(
            <Radio.Group>
              <Radio value>一对一</Radio>
              <Radio value={false}>一对多</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="收费方式"  {...formItemLayout}>
             <div className={classnames({[styles.payModelContent]:true})}>
                <p>按课时收费</p>
                <Row gutter={16}>
                <Col span={6}>
                {getFieldDecorator('payPerHourSwitch')(<Switch defaultChecked={!input_1Useable} checkedChildren="开" unCheckedChildren="关" onChange={switch1}/>)}
                </Col>
                <Col span={18}>
                {getFieldDecorator('payPerHour')(<Input addonBefore={'单价'} addonAfter={'元/小时'} disabled={input_1Useable}/>)}
                </Col>
                </Row>
                <p>按期收费</p>
                <Row gutter={16}>
                <Col span={6}>
                {getFieldDecorator('payPerTermSwitch')(<Switch defaultChecked={!input_2Useable} checkedChildren="开" unCheckedChildren="关" onChange={switch2}/>)}
                </Col>
                <Col span={18}>
                {getFieldDecorator('payPerTerm')(<Input addonBefore={'课程总价'} addonAfter={'元/期'} disabled={input_2Useable}/>)}
                </Col>
                </Row>
                <p>按月收费</p>
                <Row gutter={16}>
                <Col span={6}>
                {getFieldDecorator('payPerMonthSwitch')(<Switch defaultChecked={!input_3Useable} checkedChildren="开" unCheckedChildren="关" onChange={switch3}/>)}
                </Col>
                <Col span={18}>
                {getFieldDecorator('payPerMonth')(<Input addonBefore={'课程总价'} addonAfter={'元/月'} disabled={input_3Useable}/>)}
                </Col>
                </Row>
             </div>
        </FormItem>
        <FormItem label="描述"  {...formItemLayout}>
          {getFieldDecorator('describe',{
            initialValue: '对课程的一些描述（选填，最多200字）'
          })(
            <TextArea rows={4} />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
