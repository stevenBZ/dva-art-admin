import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Menu, Dropdown } from 'antd'
import SearchCard from '../SearchCard'
const { RangePicker } = DatePicker
const Search = Input.Search
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  plainOptions,
  onAdd,
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const SearchCardProps={
    title:'教师姓名',
    keyProps:name,
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <SearchCard />
      </Menu.Item>
    </Menu>
  );
  

  return (
     <Row gutter={24}>
     <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
       {getFieldDecorator('name', { initialValue: name })(<Search placeholder="学员名" size="large" onSearch={handleSubmit} />)}
     </Col>
     <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
       {getFieldDecorator('courageName')(<Search placeholder="班级名" size="large" onSearch={handleSubmit} />)}
     </Col>
     <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('rollCallTime')(<RangePicker/>)}
      </Col>
     <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
         <div >
           <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
           <Button size="large" onClick={handleReset}>重置</Button>
         </div>
       </div>
     </Col>
   </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
