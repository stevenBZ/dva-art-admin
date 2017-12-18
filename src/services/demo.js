import { request, config } from 'utils'

const { api } = config
const { demo } = api

export async function query (params) {
  return request({
    url: demo,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: demo,
    method: 'delete',
    data: params,
  })
}
