import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

import WelcomePage from './views/User/WelcomePage.vue';
import AdvertisersList from './views/AdComponents/Advertisers/List.vue';
import AdList from './views/AdComponents/AdList/List.vue';
import MediaList from './views/MediaSystem/MediaList.vue';

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
            { path: '/advertisers/list', iconCls: 'menu-icon ali-iconfont iconziyuan', component: AdvertisersList, name: '广告组列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '媒体系统',
        iconCls: 'menu-icon ali-iconfont iconCONTACTFORM',
        leaf: true,//只有一个节点
        children: [
            // { path: '/mediasystem/createAd', iconCls: 'menu-icon ali-iconfont iconziyuanldpi', component: CreateAd, name: '创建广告' },
            { path: '/mediasystem/list', iconCls: 'menu-icon ali-iconfont icondaily-report', component: MediaList, name: '媒体列表' },
            // { path: '/banndAd/userList', iconCls: 'menu-icon ali-iconfont iconziyuanldpi', component: BannedAdUser, name: '渠道惩罚日报表' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '账号权限管理',
    //     iconCls: 'menu-icon ali-iconfont iconquanxian',
    //     // leaf: true,//只有一个节点
    //     children: [
    //         { path: '/user/list', iconCls: 'menu-icon ali-iconfont iconguanliyuan1', component: UserList, name: '账号管理' },
    //         { path: '/accountGroup/list', iconCls: 'menu-icon ali-iconfont iconnav_user', component: accountGroup, name: '账号组管理' },
    //         { path: '/permission/list', iconCls: 'menu-icon ali-iconfont iconguanliyuan', component: Permission, name: '权限管理' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '相关设置',
    //     iconCls: 'menu-icon ali-iconfont iconsetting',
    //     // leaf: true,//只有一个节点
    //     children: [
    //         { path: '/update/page', iconCls: 'menu-icon ali-iconfont iconziyuan', component: Update, name: '前端升级' },
    //         // { path: '/user/list', iconCls: 'menu-icon iconfont iconUserSettings', component: UserList, name: '用户管理' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
