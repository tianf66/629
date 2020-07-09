import axios from 'axios';
import urls from '../config.js';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//登录Ajax请求
export const requestLogin = params => {return axios.post(urls.login, params).then(res => res.data);};
//前端版本listAjax请求
export const getVersionUpdate = params => {return axios({url: urls.versionUpdate, params})};
//Ajax请求 获取邮箱验证码
export const getUpdateEmailCode = params => {return axios({url: urls.emailCode, params})};
//修改前端版本号Ajax请求
export const getModifyConfig = params => {return axios.post(urls.modifyConfig, params)};
/*
	******************* 用户管理模块接口api start
*/
	//获取userlistAjax请求
export const getUserList = params => {return axios({url: urls.userList, params: params})};
	//添加 user Ajax请求
export const getAddUser = params => {return axios.post(urls.addUser, params)};
	//删除user api
export const getDeleteUser = params => {return axios({url: urls.deleteUser, params})};
	//修改user 信息Ajax请求
export const getUpdateUser = params => {return axios.post(urls.updateUser, params)};
//用户分配账户组
export const getUpdateUserRole = params => {return axios.post(urls.updateUserRole, params)};
/*
	******************* 用户管理模块接口api end
*/
/*
	******************* 账户组管理模块接口api start
*/
//账号组list
export const getRoleList = params => {return axios({url: urls.roleList, params})};
//添加账号组 api
export const getAddRole = params => {return axios.post(urls.addRole, params)};
//修改账户组
export const getUpdateRole = params => {return axios.post(urls.updateRole, params)};
//添加账号组名称排重
export const getCheckRoleName = params => {return axios({url: urls.checkRoleName, params})};
//删除账户组
export const getDeleteRole = params => {return axios({url: urls.deleteRole, params})};
//查看账号组成员
export const getRoleUser = params => {return axios({url: urls.getRoleUser, params})};
//绑定账户组权限
export const getUpdateRolePerm = params => {return axios.post(urls.updateRolePerm, params)};
/*
	******************* 账户组管理模块接口api end
*/
/*
	******************* 权限管理模块接口api start
*/
//权限管理list
export const getPermissionList = params => {return axios({url: urls.permissionList, params})};
//添加权限管理 api
export const getAddPermission = params => {return axios.post(urls.addPermission, params)};
//修改权限管理
export const getUpdatePermission = params => {return axios.post(urls.updatePermission, params)};
//添加权限管理名称排重
export const getCheckPermission = params => {return axios({url: urls.checkPermission, params})};
//删除权限管理
export const getDeletePermission = params => {return axios({url: urls.deletePermission, params})};
// export const getDeletePermission = params => {return axios.post(urls.deletePermission, params)};
/*
	******************* 权限管理模块接口api end
*/
//渠道日报表Ajax请求
export const getReportList = params => {return axios({url: urls.reportList, params})};
//渠道日报表详情
export const getReportDetail = params => {return axios({url: urls[params.type], params})};
//美图2渠道列表Ajax请求
export const getOpgirl2Channel = params => {return axios({url: urls.opgirl2Channel, params})};
//美图1渠道列表Ajax请求
export const getOpgirlChannel = params => {return axios({url: urls.opgirlChannel, params})};
//美图lite渠道列表Ajax请求
export const getOpgirlLiteChannel = params => {return axios({url: urls.opgirlLiteChannel, params})};
//资讯渠道列表
export const getNewsChannel = params => {return axios.post(urls.newsChannel, params)};
//笑百播客渠道列表 ajax
export const getJokeOrbokeChannel = params => {return axios({url: urls.jokeOrbokeChannel, params})};
//渠道惩罚日报表
export const getProhibition = params => {return axios({url: urls.prohibition, params})};
