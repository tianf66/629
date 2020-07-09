import axios from 'axios';
import urls from '../config.js';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


/* 添加广告主 */
export const getAddAdvertiser = params => {return axios.post(urls.getAddAdvertiser, params)};
/* 删除广告主 */
export const getDeleteAdvertiser = params => {return axios.delete(`${urls.getDeleteAdvertiser}?advertiserId=${params.advertiserId}`)};
/* 广告主翻页列表 */
export const getPageAdvertiser = params => {return axios({url: urls.getPageAdvertiser, params: params})};
/* 修改编辑广告主 */
export const getUpdateAdvertiser = params => {return axios.post(urls.getUpdateAdvertiser, params)};
/* 修改广告主状态 */
export const getUpdateAdvertiserStatus = params => {return axios.post(`${urls.getUpdateAdvertiserStatus}?advertiserId=${params.advertiserId}&status=${params.status}`)};