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



/* 添加广告 */
export const getAddAdvertisement = params => {return axios.post(urls.getAddAdvertisement, params)};
/* 删除广告 */
export const getDeleteAdvertisement = params => {return axios.delete(`${urls.getDeleteAdvertisement}?advertisementId=${params.advertisementId}`)};
/* 广告翻页列表 */
export const getPageAdvertisement = params => {return axios({url: urls.getPageAdvertisement, params: params})};
/* 修改编辑广告 */
export const getUpdateAdvertisement = params => {return axios.post(urls.getUpdateAdvertisement, params)};
/* 禁用广告 */
export const getDisableAdvertisement = params => {return axios.post(`${urls.getDisableAdvertisement}?advertisementId=${params.advertisementId}`)};
/* 启用广告 */
export const getEnableAdvertisement = params => {return axios.post(`${urls.getEnableAdvertisement}?advertisementId=${params.advertisementId }`)};


/* 添加适配类型 */
export const getAddAdaptertype = params => {return axios.post(urls.getAddAdaptertype, params)};
/* 删除广告 */
export const getDeleteAdaptertype = params => {return axios.delete(`${urls.getDeleteAdaptertype}?adaptertypeId=${params.adaptertypeId}`)};
/* 分页查询适配类型 */
export const getPageAdaptertype = params => {return axios({url: urls.getPageAdaptertype, params: params})};


/*添加媒体*/
export const getAddMedia = params => {return axios.post(urls.getAddMedia, params)};
/*删除媒体*/
export const getDeleteMedia = params => {return axios.delete(`${urls.getDeleteMedia}?mediaId=${params.mediaId}`)};
/*分页查询媒体*/
export const getPageMedia = params => {return axios({url: urls.getPageMedia, params: params})};
/*修改媒体*/
export const getUpdateMedia = params => {return axios.post(urls.getUpdateMedia, params)};

/*添加媒体主*/
export const getAddMediaowner = params => {return axios.post(urls.getAddMediaowner, params)};
/*删除媒体主*/
export const getDeleteMediaowner = params => {return axios.delete(`${urls.getDeleteMediaowner}?mediaownerId=${params.mediaownerId}`)};
/*分页查询媒体主*/
export const getPageMediaowner = params => {return axios({url: urls.getPageMediaowner, params: params})};
/*修改媒体主*/
export const getUpdateMediaowner = params => {return axios.post(urls.getUpdateMediaowner, params)};


/*添加媒体分类*/
export const getAddCategory = params => {return axios.post(urls.getAddCategory, params)};
/*删除媒体分类*/
export const getDeleteCategory = params => {return axios.delete(`${urls.getDeleteCategory}?categoryId=${params.categoryId }`)};
/*分页查询媒体分类*/
export const getPageCategory = params => {return axios({url: urls.getPageCategory, params: params})};


