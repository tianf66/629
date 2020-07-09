<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true">
				<el-form-item><el-button @click="addMask">新增权限</el-button></el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<tree-grid
			:columns="columns"
			:tree-structure="true"
			:data-source="permissionList"
			@showEdit="handleEditPermission"
			@showDelete="handleDeletePermission"
			>
		</tree-grid>
		<!-- 新增 || 权限model -->
		<el-dialog :title="editPermissionBtn ? '修改权限':'新增权限'" :visible.sync="addPermissionMask">
			<el-form ref="form" :model="form" label-width="150px">
				<el-form-item label="权限模块：">
				    <el-radio-group v-model="form.resource">
					     <el-radio v-model="form.resource" label="1">一级权限</el-radio>
					     <el-radio v-model="form.resource" label="0">二级权限</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="请选一级权限：" v-if="form.resource == '0'">
				    <el-radio-group v-model="form.pid">
				      <el-radio class="per_radio" v-for="item in onPermissionList" v-model="form.pid" :key="item.id" :label="item.id">{{item.menu}}</el-radio>
				    </el-radio-group>
				</el-form-item>
				<el-form-item label="权限名称：">
				    <el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="url：">
				    <el-input v-model="form.url"></el-input>
				</el-form-item>
				<el-form-item label="权限代码：">
				    <el-input v-model="form.permission"></el-input>
				</el-form-item>
			  <el-form-item>
			    <el-button type="primary" v-if="!editPermissionBtn" @click="addPermission">立即创建</el-button>
			    <el-button type="primary" v-if="editPermissionBtn" @click="editPermission">修改</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;"></el-pagination>
		</el-col>
	</section>
</template>

<script>
import util from '../../common/js/util'
import {getPermissionList, getCheckPermission, getAddPermission, getUpdatePermission, getDeletePermission} from '../../api/api';
import {TreeGrid} from '../TreeTable';
export default {
	components: {
		TreeGrid
	},
	data() {
		return {
			columns: [
		       // {text: 'ID', dataIndex: 'id'},
		       {text: '权限名称', dataIndex: 'menu'},
		       {text: '权限代码', dataIndex: 'permission'},
		       {text: '地址', dataIndex: 'url'}
		    ],
		    form: {
	          name: '',
	          id: '',
	          url: '',
	          permission: '',
	          resource: '',
	          desc: '',
	          pid: ''
	        },
			permissionList: [],
			onPermissionList: [],
			total: 0,
			addPermissionMask: false,
			editPermissionBtn: false,
			page: 1
		}
	},
	methods: {
		handleCurrentChange(val) {
			this.page = val;
		},
		getPermissionList() {
			let para = {
				page: this.page,
				rows: 10
			};
			this.listLoading = true;
			getPermissionList(para).then((res) => {
				let data = res.data;
				this.permissionList = data.data;
				this.total = data.totalCount;
				this.onPermissionList = data.data2;
				this.listLoading = false;
			});
		},
		addPermission() {
			if(this.form.resource == '1') {
				if(!(this.form.name && this.form.url && this.form.permission)) {
					this.$message({
						message: `${!this.form.name ? '请填写权限名称' : !this.form.url ? '请填写url' : '请填写权限代码'}`,
						duration: 3000,
						type: 'error'
					});
					return;
				}
			} else if(this.form.resource == '0') {
				if(!(this.form.name && this.form.permission)) {
					this.$message({
						message: `${!this.form.name ? '请填写权限名称' : '请填写权限代码'}`,
						duration: 3000,
						type: 'error'
					});
					return;
				}
			} else {
				this.$message({
					message: `选择创建的权限模块`,
					duration: 3000,
					type: 'error'
				});
				return;
			}
			let checkParams = {permName: this.form.name};
			getCheckPermission(checkParams).then((res) => {
				let data = res.data;
				if(data.status == 1) {
					let params = {
						menu: this.form.name,
						url: this.form.url,
						permission: this.form.permission,
						pnode: this.form.resource == '0' ? '0':'1'
					};
					if(this.form.resource == '0') params.pid = this.form.pid;
					getAddPermission(params).then((res) => {
						let data = res.data;
						if(data.status == 1) {
							this.$message({
						        message: `${data.msg}`,
						        duration: 2000,
						        type: 'success'
						    });
						    this.addPermissionMask = false;
						    this.getPermissionList();
						} else {
							this.$message({
						        message: `${data.msg}`,
						        duration: 2000,
						        type: 'error'
						    });
						}
					});
				} else {
					this.$message({
				        message: `${data.msg}`,
				        duration: 2000,
				        type: 'error'
				    });
				}
			});
		},
		addMask() {
			this.form.name = '';
			this.form.url = '';
			this.form.permission = '';
			this.form.resource = '';
			this.form.desc = '';
			this.form.pid = '';
			this.addPermissionMask = true;
			this.editPermissionBtn = false;
		},
		handleEditPermission(data) {
			this.form.name = data.menu;
			this.form.id = data.id;
			this.form.url = data.url;
			this.form.permission = data.permission;
			this.form.resource = `${data.pnode}`;
			this.form.pid = data.pid;
			this.addPermissionMask = true;
			this.editPermissionBtn = true;
		},
		editPermission() {
			if(this.form.resource == '1') {
				if(!(this.form.name && this.form.url && this.form.permission)) {
					this.$message({
						message: `${!this.form.name ? '请填写权限名称' : !this.form.url ? '请填写url' : '请填写权限代码'}`,
						duration: 3000,
						type: 'error'
					});
					return;
				}
			} else if(this.form.resource == '0') {
				if(!(this.form.name && this.form.permission)) {
					this.$message({
						message: `${!this.form.name ? '请填写权限名称' : '请填写权限代码'}`,
						duration: 3000,
						type: 'error'
					});
					return;
				}
			} else {
				this.$message({
					message: `选择创建的权限模块`,
					duration: 3000,
					type: 'error'
				});
				return;
			}
			let checkParams = {permName: this.form.name};
			getCheckPermission(checkParams).then((res) => {
				let data = res.data;
				if(data.status == 1) {
					let params = {
						id: this.form.id,
						menu: this.form.name,
						url: this.form.url,
						permission: this.form.permission,
						pnode: this.form.resource == '0' ? '0':'1'
					};
					if(this.form.resource == '0') params.pid = this.form.pid;
					getUpdatePermission(params).then((res) => {
						let data = res.data;
						if(data.status == 1) {
							this.$message({
						        message: `${data.msg}`,
						        duration: 2000,
						        type: 'success'
						    });
						    this.addPermissionMask = false;
						    this.getPermissionList();
						} else {
							this.$message({
						        message: `${data.msg}`,
						        duration: 2000,
						        type: 'error'
						    });
						}
					});
				} else {
					this.$message({
				        message: `${data.msg}`,
				        duration: 2000,
				        type: 'error'
				    });
				}
			});
		},
		handleDeletePermission(data) {
			this.$confirm(`确认删除${data.menu}吗？`).then(_ => {
	           	let params = {id: data.id};
				getDeletePermission(params).then((res) => {
					let data = res.data;
					if(data.status == 1) {
						this.$message({
							message: `${data.msg}`,
							duration: 2000,
							type: 'success'
						});
						this.getPermissionList();
					} else {
						this.$message({
							message: `${data.msg}`,
							duration: 2000,
							type: 'error'
						});
					}
				});
	        }).catch(_ => {});
		}
	},
	mounted() {
		this.getPermissionList();
	}
}

</script>

<style scoped lang="scss">
.clearfix::after {
	clear: both;
	content: '';
	display: block;
}
.per_radio {
	padding-bottom: 10px;
}
</style>
