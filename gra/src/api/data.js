import request from '@/utils/axios'

export function getgender(params) {
  return request({
    url: '/data/get',
    method: 'get',  
    params: params
  })
}

export function adddata(params) {
  return request({
    url: '/data/add',
    method: 'get',
    params: params
  })
}

export function removedata(params) {
  return request({
    url: '/data/remove',
    method: 'get',
    params: params
  })
}


export function batchremovedata(params) {
  return request({
    url: '/data/batchremove',
    method: 'get',
    params: params
  })
}

export function updatedata(params) {
  return request({
    url: '/data/edit',
    method: 'get',
    params: params
  })
}

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }


