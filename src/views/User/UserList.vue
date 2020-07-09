<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
		        <el-button v-on:click="addUserClick">新增账号</el-button>
		    </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table border :data="userList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column align="center" prop="id" label="ID" width="80"></el-table-column>
			<el-table-column align="center" prop="username" label="登录名"></el-table-column>
			<el-table-column align="center" prop="roles[0].roleName" label="账号组"></el-table-column>
      		<el-table-column align="center" prop="email" label="邮箱地址"></el-table-column>
			<el-table-column align="center" prop="createTime" label="创建时间" width="180"></el-table-column>
      		<el-table-column align="center" label="操作" width="280">
				<template slot-scope="scope">
					<el-button
						size="small"
						@click="handleEdit(scope.$index, scope.row)">
						绑定账号组
					</el-button>
					<!-- <el-button
						size="small"
						@click="handleUpdate(scope.$index, scope.row)">
						修改
					</el-button> -->
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

	    <!-- 新增账号 -->
	    <el-dialog title="新增账号" :visible.sync="addUser">
			<el-form label-width="100px" :model="addFormUser" ref="addFormUser">
				<el-form-item label="登录名：" prop="name"><el-input v-model="addFormUser.username" auto-complete="off"></el-input></el-form-item>
	        	<el-form-item label="密码：" prop="password"><el-input v-model="addFormUser.password" auto-complete="off"></el-input></el-form-item>
	        	<el-form-item label="邮箱：" prop="email"><el-input v-model="addFormUser.email" auto-complete="off"></el-input></el-form-item>
	        	<el-form-item label="状态：" prop="status">
		          <el-radio v-model="addFormUser.status" label="0" border>停用</el-radio>
		          <el-radio v-model="addFormUser.status" label="1" border>启用</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addUser = false">取消</el-button>
				<el-button type="primary" @click="addUserSbumit">提交</el-button>
			</div>
		</el-dialog>
	    <!-- 绑定账号组 -->
	    <el-dialog title="绑定账号组" :visible.sync="editRoleMask">
			<el-form label-width="100px" :model="editFormUser" ref="addFormUser">
				<el-form-item label="用户名：" prop="name">{{ editFormUser.username }}</el-form-item>
				<el-form-item label="用户ID：" prop="name">{{ editFormUser.id }}</el-form-item>
				<el-form-item label="账号组：">
					<el-checkbox-group v-model="adduserRole">
					    <el-checkbox
					    v-for="item in roleList"
					    :key="item.id"
					    :label="item.id"
					    border>{{item.roleName}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editUserSbumit">绑定</el-button>
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
import { getUserList, getAddUser, getUpdateUser, getDeleteUser, getUpdateUserRole } from '../../api/api';
export default {
	data() {
		return {
		 	filters: {
				status: ''
			},
			userList: [],
			roleList: [],
        	addFormUser: {
	          username: '',
	          password: '',
	          status: '',
	          email: ''
	        },
	        adduserRole: [],
	        editFormUser: {
	          id: '',
	          username: '',
	        },
	        addUser: false,
	        editRoleMask: false,
			total: 0,
			page: 1,
			listLoading: false,
			userStatus: [{
	          value: '停用',
	          status: 0
	        }, {
	          value: '启用',
	          status: 1
	        }, {
	          value: '删除',
	          status: 2
	        }]
		}
	},
	methods: {
		handleCurrentChange(val) {
			this.page = val;
			this.getUserList();
		},
		//获取用户列表
		getUserList() {
			let para = {
				page: this.page,
				rows: 20,
				status: this.filters.status
			};
			this.listLoading = true;
			getUserList(para).then((res) => {
				this.total = res.data.totalCount;
				this.userList = res.data.data;
				this.roleList = res.data.data2;
				this.listLoading = false;
			});
		},
		// handleUpdate() {
		// 	let params = {
		// 		id: '1',
		// 		username: 'admin',
		// 		password: 'operation123'
		// 	}
		// 	getUpdateUser(params).then((res) => {
		// 		console.log(res);
		// 	});
		// },
		selsChange: function (sels) {
			this.sels = sels;
		},
      	addUserSbumit() {
	        let addFormUser = this.addFormUser;
	        if(addFormUser.username && addFormUser.password && addFormUser.email) {
	          let data = JSON.stringify(this.addFormUser);
	          getAddUser(data).then((res) => {
	            this.$alert(`${res.data.msg}`, '系统提示', {
	              confirmButtonText: '确定',
	              callback: action => {
	                this.addUser = false;
	                this.getUserList();
	              }
	            });
	          });
	        } else {
	          this.$message({
	            message: '请将信息填写完整',
	            type: 'warning'
	          });
	        }
      },
      editUserSbumit() {
      	let userIds = [];
      	userIds.push(this.editFormUser.id);
        let params = {
        	userIds: userIds,
        	roleIds: this.adduserRole
        };
        getUpdateUserRole(params).then((res) => {
        	let data = res.data;
        	if(data.status == 1) {
        		this.$message({
		          message: `${data.msg}`,
		          type: 'success'
		        });
		        this.editRoleMask = false;
		        this.getUserList();
        	} else {
        		this.$message({
		          message: `${data.msg}`,
		          type: 'error'
		        });
        	}
        });
      },
      addUserClick() {
        this.addFormUser.username = '';
        this.addFormUser.password = '';
        this.addFormUser.status = '';
        this.addFormUser.email = '';
        this.addUser = true;
      },
      handleEdit(index, row) {
      	this.adduserRole = [];
        this.editFormUser.id = row.id;
        this.editFormUser.username = row.username;
        let rolesId = row.roles;
        rolesId.forEach((item, index) => {
        	this.adduserRole.push(item.id);
        });
        this.editRoleMask = true;
      },
      handleDelete(index, row) {
		this.$confirm(`确认删除${row.username}吗？`).then(_ => {
           let params = {id: row.id};
		   getDeleteUser(params).then((res) => {
		   	let data = res.data;
		   	if(data.status == 1) {
		   		this.$message({
		          message: `${data.msg}`,
		          type: 'success'
		        });
		        this.getUserList();
		   	} else {
		   		this.$message.error(`${data.msg}`);
		   	}
		   });
        }).catch(_ => {});
      }
	},
	mounted() {
		this.getUserList();
	}
}

</script>

<style scoped lang="scss">
.clearfix::after {
	clear: both;
	content: '';
	display: block;
}
a:link {color: blue; text-decoration:none;} //未访问：蓝色、无下划线
a:active {color: red; } //激活：红色
a:visited {color:purple;text-decoration:none;} //已访问：紫色、无下划线
a:hover {color: red; text-decoration:underline;} //鼠标移近：红色、下划线
</style>
