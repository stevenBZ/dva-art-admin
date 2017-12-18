import { request, config } from 'utils'

const { api } = config
const { courages } = api

export async function query (params) {
  return request({
    url: courages,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: courages,
    method: 'delete',
    data: params,
  })
}
