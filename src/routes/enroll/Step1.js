import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,DatePicker,Button} from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const First = ({ 
    item={},
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
}) => {

  const onValidateForm = () => {
    validateFields((err, values) => {
      // if (!err) {
      //   dispatch({
      //     type: 'form/saveStepFormData',
      //     payload: values,
      //   });
      //   dispatch(routerRedux.push('/form/step-form/confirm'));
      // }
    });
  };

  return (
      <Form layout="horizontal">
        <FormItem label="姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="联系手机号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '不是有效的手机号码',
              },
            ],
          })(<Input />)}
        </FormItem> 
        <FormItem label="性别" hasFeedback {...formItemLayout}>
          {getFieldDecorator('isMale', {
            initialValue: item.isMale,
            rules: [
              {
                required: true,
                type: 'boolean',
              },
            ],
          })(
            <Radio.Group>
              <Radio value>男</Radio>
              <Radio value={false}>女</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="生日"  {...formItemLayout}>
          {getFieldDecorator('birthday')(<DatePicker />)}
        </FormItem>
        <FormItem label="学校"  {...formItemLayout}>
          {getFieldDecorator('school')(<Input />)}
        </FormItem>
        <FormItem label="年级"  {...formItemLayout}>
          {getFieldDecorator('grade')(<Input />)}
        </FormItem>
        <FormItem label="来源"  {...formItemLayout}>
          {getFieldDecorator('source')(<Input />)}
        </FormItem>
        <FormItem label="备用号码"  {...formItemLayout}>
          {getFieldDecorator('sparePhone')(<Input />)}
        </FormItem>
        <FormItem label="地址"  {...formItemLayout}>
          {getFieldDecorator('address')(<Input />)}
        </FormItem>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
  )
}

export default Form.create()(First)
