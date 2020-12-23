import { axios } from '@/utils/request'

// get请求
export function getAction(url, params, timeout = 20000, headers = { 'Content-Type': 'application/json;' }) {
  return axios({
    url,
    method: 'GET',
    params,
    headers,
    timeout
  })
}

// delete请求
export function deleteAction(url, params, timeout = 10000, headers = { 'Content-Type': 'application/json;' }) {
  return axios({
    url,
    method: 'DELETE',
    params,
    headers,
    timeout
  })
}

// post请求
export function postAction(url, data, timeout = 10000, headers = { 'Content-Type': 'application/json;' }) {
  return axios({
    url,
    method: 'POST',
    data,
    headers,
    timeout
  })
}

// put请求
export function putAction(url, data, timeout = 10000, headers = { 'Content-Type': 'application/json;' }) {
  return axios({
    url,
    method: 'PUT',
    data,
    headers,
    timeout
  })
}
// upload 文件上传
export function uploadAction(url, data, timeout = 0, headers = { 'Content-Type': 'multipart/form-data;' }) {
  return axios({
    url,
    method: 'POST',
    data,
    headers,
    timeout
  })
}

// download 二进制流文件下载
export function downloadAction(url, params, responseType = 'blob', timeout = 0, headers = { 'Content-Type': 'application/json;' }) {
  return axios({
    url,
    method: 'GET',
    params,
    headers,
    timeout,
    responseType
  })
}
