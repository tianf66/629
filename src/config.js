let host = ``;
if(process.env.NODE_ENV == 'development') {
    host =  `/proxy`;
}

let config = {

/*                   广告主 start           */
      //添加广告主
      getAddAdvertiser: `${host}/api/advertisement/advertiser/addAdvertiser`,
      //删除广告主
      getDeleteAdvertiser: `${host}/api/advertisement/advertiser/deleteAdvertiser`,
      //广告主翻页列表
      getPageAdvertiser: `${host}/api/advertisement/advertiser/pageAdvertiser`,
      //修改编辑广告主
      getUpdateAdvertiser: `${host}/api/advertisement/advertiser/updateAdvertiser`,
      //修改广告主状态
      getUpdateAdvertiserStatus: `${host}/api/advertisement/advertiser/updateAdvertiserStatus`,
/*                   广告主 end           */


/*                   广告 start           */
      //添加广告
      getAddAdvertisement: `${host}/api/advertisement/advertisement/addAdvertisement`,
      //删除广告
      getDeleteAdvertisement: `${host}/api/advertisement/advertisement/deleteAdvertisement`,
      //分页查询广告
      getPageAdvertisement: `${host}/api/advertisement/advertisement/pageAdvertisement`,
      //修改广告
      getUpdateAdvertisement: `${host}/api/advertisement/advertisement/updateAdvertisement`,
      //禁用广告
      getDisableAdvertisement: `${host}/api/advertisement/advertisement/disableAdvertisement`,
      //启用广告
      getEnableAdvertisement: `${host}/api/advertisement/advertisement/enableAdvertisement`,
/*                   广告 end           */


/*                   适配类型 start           */
      //添加适配类型
      getAddAdaptertype: `${host}/api/advertisement/adaptertype/addAdaptertype`,
      //删除适配类型
      getDeleteAdaptertype: `${host}/api/advertisement/adaptertype/deleteAdaptertype`,
      //分页查询适配类型
      getPageAdaptertype: `${host}/api/advertisement/adaptertype/pageAdaptertype`,
/*                   适配类型 end           */


/*                   媒体 start           */
      //添加媒体
      getAddMedia: `${host}/media/media/addMedia`,
      //删除媒体
      getDeleteMedia: `${host}/media/media/deleteMedia`,
      //分页查询媒体
      getPageMedia: `${host}/media/media/pageMedia`,
      //修改媒体
      getUpdateMedia: `${host}/media/media/updateMedia`,
/*                   媒体 end           */


/*                   媒体主 start           */
      //添加媒体主
      getAddMediaowner: `${host}/media/mediaowner/addMediaowner`,
      //删除媒体主
      getDeleteMediaowner: `${host}/media/mediaowner/deleteMediaowner`,
      //分页查询媒体主
      getPageMediaowner: `${host}/media/mediaowner/pageMediaowner`,
      //修改媒体主
      getUpdateMediaowner: `${host}/media/mediaowner/updateMediaowner`,
/*                   媒体主 end           */

/*                   媒体分类 start           */
      //添加分类
      getAddCategory: `${host}/api/media/category/addCategory`,
      //删除分类
      getDeleteCategory: `${host}/api/media/category/deleteCategory`,
      //分页查询分类
      getPageCategory: `${host}/api/media/category/pageCategory`,
/*                   媒体分类 end           */



}
export default config;
