import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

import WelcomePage from './views/User/WelcomePage.vue';
import AdvertisersList from './views/AdComponents/Advertisers/List.vue';
import AdList from './views/AdComponents/AdList/List.vue';
import MediaList from './views/MediaSystem/MediaList.vue';
import MediaOwner from './views/MediaSystem/MediaOwner.vue';
import AdaptationType from './views/Seting/AdaptationType.vue';
import MediaCategory from './views/Seting/MediaCategory.vue';

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'menu-icon ali-iconfont iconhome',
        leaf: true,//只有一个节点
        children: [
            { path: '/welcomePage', component: WelcomePage, name: '首页' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '广告系统',
        iconCls: 'menu-icon ali-iconfont iconCONTACTFORM',
        children: [
            { path: '/adlist/list', iconCls: 'menu-icon ali-iconfont icondaily-report', component: AdList, name: '广告列表' },
            { path: '/advertisers/list', iconCls: 'menu-icon ali-iconfont iconziyuan', component: AdvertisersList, name: '广告主列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '媒体系统',
        iconCls: 'menu-icon ali-iconfont iconquanxian',
        // leaf: true,//只有一个节点
        children: [
            { path: '/mediasystem/mediaowner', iconCls: 'menu-icon ali-iconfont iconnav_user', component: MediaOwner, name: '媒体主列表' },
            { path: '/mediasystem/list', iconCls: 'menu-icon ali-iconfont iconguanliyuan1', component: MediaList, name: '媒体列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理设置',
        iconCls: 'menu-icon ali-iconfont iconsetting',
        // leaf: true,//只有一个节点
        children: [
            { path: '/adaptation_type/list', iconCls: 'menu-icon ali-iconfont iconziyuan', component: AdaptationType, name: '适配类型' },
            { path: '/media_category/', iconCls: 'menu-icon ali-iconfont iconUserSettings', component: MediaCategory, name: '媒体分类' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
