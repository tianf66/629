let config = {
      opgirl2Channel: '//admin3.opgirl.cn/distributor/findAll',//美图2频道列表
      jokeOrbokeChannel: '//joke2admin.oupeng.com/distributors/getDistributorsByType',//笑百播客渠道列表
      opgirlChannel:'http://admin.opgirl.cn/distributor/findVersion1DistributorList',//美图1渠道列表
      opgirlLiteChannel:'http://admin.opgirl.cn/distributor/findLiteDistributorList',//美图lite渠道列表
      newsChannel: 'https://n.opgirl.cn/api/distributor/back/findList',//资讯渠道列表
      reportList: '//175.25.24.3:8888/chs',//渠道日报表list
      opgirl2ReportDetail: '//175.25.24.3:8888/opgirl2',//美图2渠道日报表详情
      jokeReportDetail: '//175.25.24.3:8888/joke',//笑百渠道日报表详情
      bokeReportDetail: '//175.25.24.3:8888/boke',//播客渠道日报表详情
      opnewsReportDetail: '//175.25.24.3:8888/opnews',//资讯渠道日报表详情
      prohibition: '/prohibition/list',//渠道惩罚日报表
      versionUpdate: '/config',//获取前端版本号
      emailCode: '/config/emailCode',//接收前端版本号验证码
      modifyConfig: '/config/updateConfig',//修改前端版本号
      login: '/login',//登录
      /*
            用户管理模块接口 start
      */
      userList: '/user/list', //用户列表页
      addUser: '/user/addUser', //新增用户
      deleteUser: '/user/delete',//删除用户
      updateUser: '/user/updateUser', //修改用户
      updateUserRole: '/user/updateUserRole',//分配用户角色 参数: json格式用户id和角色id（可多个）
      /*
            用户管理模块接口 end
      */

      /*
            账号组模块接口 start
      */
      roleList: '/role/list', //账号组列表页
      addRole: '/role/addRole', //新增账户组
      deleteRole: '/role/delete',//删除账户组
      updateRolePerm: '/role/updateRolePerm',//更改账户组权限 参数 json格式的角色id 和权限id
      updateRole: '/role/updateRole', //修改账户组
      checkRoleName: '/role/check',//新建账户组名称查询
      getRoleUser: '/role/getRoleUser',//查看账号组成员
      /*
            账号组模块接口 end
      */
      /*
            权限管理模块接口 start
      */
      permissionList: '/permission/list',//列表
      addPermission: '/permission/addPerm',//增加权限 参数权限的实体类
      updatePermission: '/permission/updateRole', //修改权限 参数权限的实体类
      deletePermission: '/permission/delete', //删除权限 参数 权限id
      checkPermission: '/permission/check',// 权限名称查重 参数 权限名称
      /*
            权限管理模块接口 end
      */
};
let proxyConfig = {
      opgirl2Channel: '//admin3.opgirl.cn/distributor/findAll',//美图2频道列表
      jokeOrbokeChannel: '//joke2admin.oupeng.com/distributors/getDistributorsByType',//笑百播客渠道列表
      opgirlChannel:'http://admin.opgirl.cn/distributor/findVersion1DistributorList',//美图1渠道列表
      opgirlLiteChannel:'http://admin.opgirl.cn/distributor/findLiteDistributorList',//美图lite渠道列表
      newsChannel: 'https://n.opgirl.cn/api/distributor/back/findList',//资讯渠道列表
      reportList: '//175.25.24.3:8888/chs',//渠道日报表list
      opgirl2ReportDetail: '//175.25.24.3:8888/opgirl2',//美图2渠道日报表详情
      jokeReportDetail: '//175.25.24.3:8888/joke',//笑百渠道日报表详情
      bokeReportDetail: '//175.25.24.3:8888/boke',//播客渠道日报表详情
      opnewsReportDetail: '//175.25.24.3:8888/opnews',//资讯渠道日报表详情
      versionUpdate: '/proxy/config',
      emailCode: '/proxy/config/emailCode',
      modifyConfig: '/proxy/config/updateConfig',
      login: '/proxy/login',
      userList: '/proxy/user/list',
      addUser: '/proxy/user/addUser',
      deleteUser: '/proxy/user/delete',//删除用户
      updateUser: '/proxy/user/updateUser',
      addRole: '/proxy/role/addRole', //新增账户组
      roleList: '/proxy/role/list', //账号组列表页
      checkRoleName: '/proxy/role/check',//新建账户组名称查询
      deleteRole: '/proxy/role/delete',//删除账户组
      getRoleUser: '/proxy/role/getRoleUser',//查看账号组成员
      permissionList: '/proxy/permission/list',//列表
      updateRole: '/proxy/role/updateRole', //修改账户组
      addPermission: '/proxy/permission/addPerm',//增加权限 参数权限的实体类
      updatePermission: '/proxy/permission/updateRole', //修改权限 参数权限的实体类
      deletePermission: '/proxy/permission/delete', //删除权限 参数 权限id
      checkPermission: '/proxy/permission/check',// 权限名称查重 参数 权限名称
      updateUserRole: '/proxy/user/updateUserRole',//分配用户账户组 参数: json格式用户id和角色id（可多个）
      updateRolePerm: '/proxy/role/updateRolePerm',//更改账户组权限 参数 json格式的角色id 和权限id
      prohibition: '/proxy/prohibition/list'//质量成分日报表
};
let urls;
if(process.env.NODE_ENV == 'development') {
    urls =  proxyConfig;
} else {
    urls =  config;
}
export default urls;
