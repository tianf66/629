<template>
	<section>
		<!--*****************头部工具条 start*****************-->
    <el-col :span="24" class="toolbar">
      <el-form class="el-form" :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="createAdHandle">创建广告主</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-input placeholder="请输入关键字查询" v-model="filters.keyWord" clearable></el-input>
        </el-form-item> -->
      </el-form>
    </el-col>
    <!--*****************头部工具条 end*****************-->


    <!--*****************创建广告主Module start*****************-->
    <el-dialog title="创建广告主" :visible.sync="createAdVertisersVisible">
      <el-form :model="addAdvertiserForm">
        <el-form-item label="广告主名称" label-width="100px">
          <el-input v-model="addAdvertiserForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商务" label-width="100px">
          <el-input v-model="addAdvertiserForm.contacterName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createAdVertisersVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addAdvertiserHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************创建广告主Module end*****************-->


    <!--*****************编辑广告主Module start*****************-->
    <el-dialog title="编辑广告主" :visible.sync="editAdVertisersVisible">
      <el-form :model="editAdvertiserForm">
        <el-form-item label="广告主名称" label-width="100px">
          <el-input v-model="editAdvertiserForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商务" label-width="100px">
          <el-input v-model="editAdvertiserForm.contacterName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAdVertisersVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editAdvertiserHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************编辑广告主Module end*****************-->


    <!--*****************修改广告主状态Module start*****************-->
    <el-dialog title="修改广告主状态" :visible.sync="updateAdVertisersVisible">
      <el-form>
        <el-form-item label="状态" label-width="100px">
          <el-radio-group v-model="updateAdvertiseStatus.status" size="mini">
            <el-radio label="1" border>启用</el-radio>
            <el-radio label="2" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdVertisersVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateAdvertiserHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************修改广告主状态Module end*****************-->


    <!--*****************广告主列表 start*****************-->
    <el-table border :data="advertiserList" highlight-current-row v-loading="advertiserListLoading">
      <el-table-column align="center" prop="title" label="名称"></el-table-column>
      <!-- <el-table-column align="center" prop="ch" label="广告数量"></el-table-column> -->
      <el-table-column align="center" prop="contacterName" label="商务"></el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{scope.row.status == 1 ? "启用" : "禁用"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作项" width="150">
        <template slot-scope="scope">
          <el-dropdown>
          <span class="el-dropdown-link">
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><div @click="editAdvertiserDropdpwn(scope.row)">编辑</div></el-dropdown-item>
            <el-dropdown-item><div @click="updateAdvertiserStatusDropdpwn(scope.row)">修改状态</div></el-dropdown-item>
            <el-dropdown-item><div @click="removeAdvertiserDropdpwn(scope.row)" style="color: red;">删除</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--*****************广告主列表 end*****************-->

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;"></el-pagination>
    </el-col>
	</section>
</template>

<script>
import {getAddAdvertiser, getUpdateAdvertiser, getPageAdvertiser, getUpdateAdvertiserStatus, getDeleteAdvertiser} from '../../../api/api.js';
export default {
  data() {
    return {
      createAdVertisersVisible: false, //广告主模态框
      advertiserListLoading: false,
      editAdVertisersVisible: false,
      updateAdVertisersVisible: false,
      pageNo: 1,
      total: 0,
      advertiserList : [],
      addAdvertiserForm: {//创广告组创建from
        contacterName: '',
        contacterPhone: 0,
        title: ''
      },
      updateAdvertiseStatus: {
        advertiserId : '',
        status: ''
      },
      editAdvertiserForm: {},
    	filters: {},
    };
  },
  mounted() {
    this.getPageAdvertiser();
  },
  methods: {
  	createAdHandle() {
      this.createAdVertisersVisible = true;
    },
    addAdvertiserHandle() {
      getAddAdvertiser(this.addAdvertiserForm).then((res) => {
        let data = res.data;
        if(data.code === 0) {
          this.$message({
            message: '广告主创建成功',
            type: 'success'
          });
          this.addAdvertiserForm.contacterName = '';
          this.addAdvertiserForm.title = '';
          this.createAdVertisersVisible = false;
          this.getPageAdvertiser();
        } else {
          this.$message.error(`${data.msg}`);
        }
      })
    },
    getPageAdvertiser() {
      let params = {
        pageNo: this.pageNo,
        pageSize: 10
      }
      this.advertiserListLoading = true;
      getPageAdvertiser(params).then((res) => {
        if(res.data.code == 0) {
          let data = res.data.data;
          this.advertiserList = data.recordList;
          this.advertiserListLoading = false;
          this.total = Number(data.totalCount);
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getPageAdvertiser();
    },
    editAdvertiserDropdpwn(row) {
      this.editAdvertiserForm = row;
      this.editAdVertisersVisible = true;
    },
    editAdvertiserHandle() {
      getUpdateAdvertiser(this.editAdvertiserForm).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.editAdVertisersVisible = false;
          this.getPageAdvertiser();
        } else {
          this.$message.error(`${data.msg}`);
        }
      })
    },
    updateAdvertiserStatusDropdpwn(row) {
      this.updateAdvertiseStatus.advertiserId = row.id;
      this.updateAdvertiseStatus.status = String(row.status);
      this.updateAdVertisersVisible = true;
    },
    updateAdvertiserHandle() {
      getUpdateAdvertiserStatus(this.updateAdvertiseStatus).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.$message({
            message: '状态修改成功',
            type: 'success'
          });
          this.getPageAdvertiser();
          this.updateAdVertisersVisible = false;
        } else {
          this.$message.error(`${data.msg}`);
        }
      });
    },
    removeAdvertiserDropdpwn(row) {
      this.$confirm(`此操作将永久删除该广告组, 是否继续?`, `${row.title}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getDeleteAdvertiser({advertiserId: row.id}).then((res) => {
            let data = res.data;
            if(data.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPageAdvertiser();
            } else {
              this.$message.error('删除失败');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
}
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>