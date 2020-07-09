let host = ``;
if(process.env.NODE_ENV == 'development') {
    host =  `/proxy`;
}

let config = {
      //添加广告主
      getAddAdvertiser: `${host}/api/advertisement/advertiser/addAdvertiser`,
      //删除广告主
      getDeleteAdvertiser: `${host}/api/advertisement/advertiser/deleteAdvertiser`,
      //广告主翻页列表
      getPageAdvertiser: `${host}/api/advertisement/advertiser/pageAdvertiser`,
      //修改编辑广告主
      getUpdateAdvertiser: `${host}/api/advertisement/advertiser/updateAdvertiser`,
      //修改广告主状态
      getUpdateAdvertiserStatus: `${host}/api/advertisement/advertiser/updateAdvertiserStatus`
}
export default config;
