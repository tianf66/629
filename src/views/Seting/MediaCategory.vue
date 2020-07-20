<template>
  <section>
    <!--*****************头部工具条 start*****************-->
    <el-col :span="24" class="toolbar">
      <el-form class="el-form" :inline="true">
        <el-form-item>
          <el-button @click="createAdaptationType">创建媒体分类</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--*****************头部工具条 end*****************-->


    <!--*****************媒体分类Module start*****************-->
    <el-dialog title="创建媒体分类" :visible.sync="createMediaCategoryVisible">
      <el-form :model="createMediaCategoryForm">
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="createMediaCategoryForm.title" autocomplete="off" placeholder="请填创建媒体分类的名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createMediaCategoryVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createMediaCategoryHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************媒体分类Module end*****************-->

    <!--*****************媒体分类列表 start*****************-->
    <el-table :data="mediaCategoryList" border style="width: 100%">
      <el-table-column align="center" prop="title" label="名称"></el-table-column>
      <el-table-column align="center" label="操作项">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><div @click="deleteMediaCategoryHeandle(scope.row)" style="color: red;">删除</div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--*****************适配类型列表 end*****************-->

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;"></el-pagination>
    </el-col>
  </section>
</template>

<script>
import {getAddCategory, getDeleteCategory, getPageCategory} from "../../api/api.js";
export default {
  data() {
    return {
      createMediaCategoryVisible: false, //广告主模态框
      mediaCategoryList: [],
      createMediaCategoryForm: {title: ""},
      pageNo: 1,
      total: 0,
    };
  },
  mounted() {
    this.getPageCategory();
  },
  methods: {
    createAdaptationType() {
      this.createMediaCategoryForm.title = "";
      this.createMediaCategoryVisible = true;
    },
    handleCurrentChange(val) {
      this.pageNo = val;
    },
    createMediaCategoryHandle() {
      getAddCategory(this.createMediaCategoryForm).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.$message({
            message: '媒体分类创建成功！',
            type: 'success'
          });
          this.getPageCategory();
          this.createMediaCategoryVisible = false;
        } else {
          this.$message.error(`${data.msg}`);
        }
      })
    },
    getPageCategory() {
      let params = {
        pageNo: this.pageNo,
        pageSize: 10
      }
      getPageCategory(params).then((res) => {
        if(res.data.code == 0) {
          let data = res.data.data;
          console.log(data);
          this.mediaCategoryList = data.recordList;
          this.total = Number(data.totalCount);
        }
      });
    },
    deleteMediaCategoryHeandle(row) {
        this.$confirm(`此操作将永久删除该媒体类型, 是否继续?`, `${row.title}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getDeleteCategory({categoryId: row.id}).then((res) => {
            let data = res.data;
            if(data.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPageCategory();
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