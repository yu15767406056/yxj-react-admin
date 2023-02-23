import request from '@/utils/request'

export const test = (params: any) => {
  return request({ method: 'get', url: '/reactJson', params })
}

export const getRouter = () => request({ method: 'get', url: '/user/getRouter' })
