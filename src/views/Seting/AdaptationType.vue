<template>
  <section>
    <!--*****************头部工具条 start*****************-->
    <el-col :span="24" class="toolbar">
      <el-form class="el-form" :inline="true">
        <el-form-item>
          <el-button @click="createAdaptationType">创建适配类型</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--*****************头部工具条 end*****************-->


    <!--*****************适配类型Module start*****************-->
    <el-dialog title="创建广告" :visible.sync="createAdaptationTypeVisible">
      <el-form :model="createAdaptationTypeForm">
        <el-form-item label="适配名称" label-width="100px">
          <el-input v-model="createAdaptationTypeForm.title" autocomplete="off" placeholder="请填创建适配类型名称"></el-input>
        </el-form-item>
        <el-form-item label="适配CODE" label-width="100px">
          <el-input v-model="createAdaptationTypeForm.code" autocomplete="off" placeholder="请填创建适配类型CODE"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createAdaptationTypeVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createAdaptationTypeHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************适配类型Module end*****************-->

    <!--*****************适配类型 start*****************-->
    <el-table :data="adaptationTypeList" border style="width: 100%">
      <el-table-column align="center" prop="id" label="ID"></el-table-column>
      <el-table-column align="center" prop="title" label="名称"></el-table-column>
      <el-table-column align="center" prop="code" label="CODE"></el-table-column>
      <el-table-column align="center" fixed="right" label="操作项" width="120">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><div @click="deleteAdaptationTypeHeandle(scope.row)" style="color: red;">删除</div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--*****************适配类型 end*****************-->

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;"></el-pagination>
    </el-col>
  </section>
</template>

<script>
import {getAddAdaptertype, getDeleteAdaptertype, getPageAdaptertype} from "../../api/api.js";
export default {
  data() {
    return {
      createAdaptationTypeVisible: false, //广告主模态框
      adaptationTypeList: [],
      createAdaptationTypeForm: {title: "", code: ""},
      pageNo: 1,
      total: 0,
    };
  },
  mounted() {
    this.getPageAdaptertype();
  },
  methods: {
    createAdaptationType() {
      this.createAdaptationTypeVisible = true;
    },
    handleCurrentChange(val) {
      this.pageNo = val;
    },
    createAdaptationTypeHandle() {
      getAddAdaptertype(this.createAdaptationTypeForm).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.$message({
            message: '适配类型创建成功',
            type: 'success'
          });
          this.getPageAdaptertype();
          this.createAdaptationTypeVisible = false;
        } else {
          this.$message.error(`${data.msg}`);
        }
      })
    },
    getPageAdaptertype() {
      let params = {
        pageNo: this.pageNo,
        pageSize: 10
      }
      getPageAdaptertype(params).then((res) => {
        if(res.data.code == 0) {
          let data = res.data.data;
          this.adaptationTypeList = data.recordList;
          this.total = Number(data.totalCount);
        }
      });
    },
    deleteAdaptationTypeHeandle(row) {
      this.$confirm(`此操作将永久删除该适配类型, 是否继续?`, `${row.title}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getDeleteAdaptertype({adaptertypeId: row.id}).then((res) => {
            let data = res.data;
            if(data.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPageAdaptertype();
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