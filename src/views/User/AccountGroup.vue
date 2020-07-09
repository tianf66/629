<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button v-on:click="addAccountGroupClick">新增账号组</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table border :data="roleList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column align="center" prop="id" label="ID"></el-table-column>
			<el-table-column align="center" prop="roleName" label="账号组名称"></el-table-column>
			<el-table-column align="center" prop="" label="描述"></el-table-column>
      		<el-table-column align="center" label="操作" width="380">
				<template slot-scope="scope">
					<el-button size="small" @click="handleRoleUser(scope.$index, scope.row)">
						查看成员列表
					</el-button>
					<el-button size="small" @click="handleAddPerm(scope.$index, scope.row)">
						绑定权限
					</el-button>
					<el-button size="small" @click="editRole(scope.$index, scope.row)">
						修改
					</el-button>
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

	    <!-- 新增 || 修改 账号组 -->
	    <el-dialog :title="title" :visible.sync="addAccountGroup">
			<el-form label-width="100px" :model="addAccountGroupForm" ref="addAccountGroupForm">
				<el-form-item label="账号组" prop="name">
					<el-input v-model="addAccountGroupForm.name" auto-complete="off" placeholder="四位或以上字符串"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="content">
					<el-input type="textarea" v-model="addAccountGroupForm.content"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addAccountGroup = false">取消</el-button>
				<el-button type="primary" v-if="!editAccountGroupBtn" @click="addAccountGroupSub">提交</el-button>
				<el-button type="primary" v-if="editAccountGroupBtn" @click="editAccountGroupSub">修改</el-button>
			</div>
		</el-dialog>

		<!-- 绑定账号组权限 -->
	    <el-dialog title="绑定权限" :visible.sync="bindingPermMask">
			<el-form label-width="100px" :model="bindingPermForm">
				<el-form-item label="账号组名称：" prop="name">
					{{bindingPermForm.name}}
				</el-form-item>
				<el-form-item label="权限列表：">
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
					<el-checkbox-group v-model="bindingPermForm.permIds">
					    <el-checkbox
					    v-for="item in bindingPermList"
					    :key="item.id"
					    :label="item.id"
					    v-if="item.pnode == 0"
					    border>{{item.menu}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="bindingPermMask = false">取消</el-button>
				<el-button type="primary" @click="addBindingPermSub">提交</el-button>
			</div>
		</el-dialog>

		<!-- 账号组成员列表 -->
	    <el-dialog title="成员列表" :visible.sync="roleUserModel">
			<el-table border :data="roleUserList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
				<el-table-column align="center" prop="id" label="ID"></el-table-column>
				<el-table-column align="center" prop="username" label="登录名"></el-table-column>
			</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="roleUserModel = false">关闭</el-button>
			</div>
		</el-dialog>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;"></el-pagination>
		</el-col>
	</section>
</template>

<script>
import util from '../../common/js/util'
import {getRoleList, getCheckRoleName, getAddRole, getDeleteRole, getRoleUser, getUpdateRole, getUpdateRolePerm, requestLogin} from '../../api/api';
export default {
	data() {
		return {
			roleList: [],
			roleUserList: [],
        	addAccountGroupForm: {
	          name: '',
	          id: '',
	          content: ''
	        },
	        addAccountGroup: false,
	        roleUserModel: false,
	        bindingPermMask: false,
	        isIndeterminate: true,
	        checkAll: false,
	        bindingPermForm: {
	        	name: '',
	        	roleId: '',
	        	permIds: []
	        },
	        bindingPermList: [],
			total: 0,
			page: 1,
			editAccountGroupBtn: false,
			listLoading: false,
			title: '新增账号组'
		}
	},
	methods: {
		handleCurrentChange(val) {
			this.page = val;
		},
		//获取账号组列表
		getRoleList() {
			let para = {
				page: this.page,
				rows: 10
			};
			this.listLoading = true;
			getRoleList(para).then((res) => {
				this.total = res.data.totalCount;
				this.roleList = res.data.data;
				this.bindingPermList = res.data.data2;
				this.listLoading = false;
			});
		},
		selsChange: function (sels) {
			this.sels = sels;
		},
      	addAccountGroupSub() {
      		if(!this.addAccountGroupForm.name) {
      			this.$message({
					message: `请填写账号组名称`,
					type: `error`
				});
				return;
      		}
      		let checkParams = {roleName: this.addAccountGroupForm.name}
      		getCheckRoleName(checkParams).then((res) => {
      			let data = res.data;
      			if(data.status == 1) {
      				let params = {roleName: this.addAccountGroupForm.name,type: 0};
		      		getAddRole(params).then((res) => {
		      			let data = res.data;
		      			this.$message({
					        message: `${data.msg}`,
					        type: `${data.status == 1 ? `success`: `error`}`
					    });
					    this.addAccountGroup = false;
					    this.getRoleList();
		      		});
      			} else {
      				this.$message({
					  	message: `${data.msg}`,
					  	type: `error`
					});
      			}
      		});
      },
      handleRoleUser(index, row) {
      	this.roleUserModel = true;
      	this.roleUserList = [];
      	let params = {roleId: row.id};
      	getRoleUser(params).then((res) => {
      		let data = res.data;
      		this.roleUserList = res.data.data;
      	});
      },
      addAccountGroupClick() {
        this.addAccountGroupForm.name = '';
        this.addAccountGroupForm.content = '';
        this.addAccountGroup = true;
        this.editAccountGroupBtn = false;
        this.title = '新增账号组';
      },
      handleCheckAllChange(val) {
        if(val) {
        	this.bindingPermList.forEach((item, index) => {
        		this.bindingPermForm.permIds.push(item.id);
        	})
        } else {
        	this.bindingPermForm.permIds = [];
        }
        this.isIndeterminate = false;
      },
      editRole(index, row) {
      	this.title = `修改${row.roleName}`;
      	this.editAccountGroupBtn = true;
      	this.addAccountGroupForm.name = row.roleName;
      	this.addAccountGroupForm.id = row.id;
      	this.addAccountGroup = true;
      },
      editAccountGroupSub() {
      	if(!this.addAccountGroupForm.name) {
      		this.$message({
				message: `请填写账号组名称`,
				type: `error`
			});
			return;
      	}
      	let checkParams = {roleName: this.addAccountGroupForm.name}
      		getCheckRoleName(checkParams).then((res) => {
      			let data = res.data;
      			if(data.status == 1) {
      				let params = {roleName: this.addAccountGroupForm.name,id: this.addAccountGroupForm.id};
		      		getUpdateRole(params).then((res) => {
		      			let data = res.data;
		      			this.$message({
					        message: `${data.msg}`,
					        type: `${data.status == 1 ? `success`: `error`}`
					    });
					    this.addAccountGroup = false;
					    this.getRoleList();
		      		});
      			} else {
      				this.$message({
					  	message: `${data.msg}`,
					  	type: `error`
					});
      			}
      		});
      },
      handleDelete(index, row) {
		this.$confirm(`确认删除${row.roleName}吗？`).then(_ => {
           let params = {id: row.id};
		   getDeleteRole(params).then((res) => {
		   	let data = res.data;
		   	if(data.status == 1) {
		   		 this.$message({
		          message: `${data.msg}`,
		          type: 'success'
		        });
		   		 this.getRoleList();
		   	} else {
		   		this.$message.error(`${data.msg}`);
		   	}
		   });
        }).catch(_ => {});
      },
      handleAddPerm(index, row) {
      	this.bindingPermMask = true;
      	this.checkAll = false;
      	this.bindingPermForm.permIds = [];
      	this.bindingPermForm.name = row.roleName;
      	this.bindingPermForm.id = row.id;
      	let permissions = row.permissions;
      	permissions.forEach((item, index) => {
      		this.bindingPermForm.permIds.push(item.id);
      	});
      },
      addBindingPermSub() {
      	let userIds = [];
      	userIds.push(this.bindingPermForm.id);
        let params = {
        	roleIds: userIds,
        	permIds: this.bindingPermForm.permIds
        };
      	getUpdateRolePerm(params).then((res) => {
      		let data = res.data;
      		this.$message({
		      message: `${data.msg}`,
		      type: `${data.status == 1 ? `success`:`error`}`
		    });
		    if(data.status == 1) {
		    	this.bindingPermMask = false;
		    	let userInfo = JSON.parse(sessionStorage.getItem('user'));
		    	let userParams = {
		    		username: userInfo.username,
		    		password: userInfo.password
		    	};
		    	requestLogin(userParams).then(data => {
	              if(data.status == 1) {
	                //更新权限
	                let permissions = data.data.permissions;
	                let perms = JSON.stringify(permissions);
	                sessionStorage.setItem('PERSLIST', perms);
	              }
            	});
		    	this.getRoleList();
		    }
      	});
      }
	},
	mounted() {
		this.getRoleList();
	}
}

</script>

<style scoped lang="scss">
.clearfix::after {
	clear: both;
	content: '';
	display: block;
}
</style>
