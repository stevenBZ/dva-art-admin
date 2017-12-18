import React from 'react'
import { Input} from 'antd'
import { Table } from 'antd'
const Search = Input.Search;

const searchCard=(title,keyProps)=>{
    const columns=[{
        title:title,
        dataIndex:keyProps,
        key:keyProps
    }]
    const dataSource=[{
        key:'1',
        keyProps:'张明明',
    }]
    return(
        <div>
        <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
        />
        <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default searchCard