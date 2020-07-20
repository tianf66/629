<template>
	<section>
		<!--*****************头部工具条 start*****************-->
		<el-col :span="24" class="toolbar">
			<el-form class="el-form" :inline="true">
				<el-form-item>
					<el-button @click="createMediaModelHandle">创建媒体</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--*****************头部工具条 end*****************-->


    <!--*****************创建媒体Module start*****************-->
    <el-dialog title="创建媒体" :visible.sync="createMediaVisible">
      <el-form :model="createMediaForm">
        <el-form-item label="媒体主" label-width="100px">
          <el-select v-model="createMediaForm.mediaownerId" clearable filterable placeholder="请选择媒体主">
            <el-option
              v-for="item in mediaOwnerList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="媒体类型" label-width="100px">
          <el-select v-model="createMediaForm.categoryId" clearable filterable placeholder="请选择媒体类型">
            <el-option
              v-for="item in mediaCategoryList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="媒体名称" label-width="100px">
          <el-input v-model="createMediaForm.title" autocomplete="off" placeholder="请填创建媒体名称"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" label-width="100px">
          <el-input v-model="createMediaForm.url" autocomplete="off" placeholder="请填创建网站地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createMediaVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createMediaHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************创建媒体Module end*****************-->

    <!--*****************编辑媒体Module start*****************-->
    <el-dialog title="编辑媒体" :visible.sync="editMediaVisible">
      <el-form :model="editMediaForm">
        <el-form-item label="媒体主" label-width="100px">
          <el-select v-model="editMediaForm.mediaownerId" clearable filterable placeholder="请选择媒体主">
            <el-option
              v-for="item in mediaOwnerList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="媒体类型" label-width="100px">
          <el-select v-model="editMediaForm.categoryId" clearable filterable placeholder="请选择媒体类型">
            <el-option
              v-for="item in mediaCategoryList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="媒体名称" label-width="100px">
          <el-input v-model="editMediaForm.title" autocomplete="off" placeholder="请填创建媒体名称"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" label-width="100px">
          <el-input v-model="editMediaForm.url" autocomplete="off" placeholder="请填创建网站地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editMediaVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editMediaHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************编辑媒体Module end*****************-->


    <!--*****************媒体列表 start*****************-->
    <el-table border :data="mediaList" highlight-current-row v-loading="mediaListLoading">
      <el-table-column align="center" prop="title" label="媒体主名称">
        <template slot-scope="scope">
          <p>{{getMediaOwnerTitle(scope.row.mediaownerId)}}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="媒体名称"></el-table-column>
      <el-table-column align="center" prop="categoryTitle" label="媒体类型"></el-table-column>
      <el-table-column align="center" prop="url" label="媒体地址">
        <template slot-scope="scope">
          <a :href=scope.row.url target="_black">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{scope.row.status == 1 ? "启用" : "禁用"}}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作项" width="150">
        <template slot-scope="scope">
          <el-dropdown>
          <span class="el-dropdown-link">
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><div @click="editMediaDropdpwn(scope.row)">编辑</div></el-dropdown-item>
            <!-- <el-dropdown-item><div @click="updateMediaStatusDropdpwn(scope.row)">修改状态</div></el-dropdown-item> -->
            <el-dropdown-item><div @click="removeMediaDropdpwn(scope.row)" style="color: red;">删除</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--*****************媒体列表 end*****************-->

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;"></el-pagination>
    </el-col>
	</section>
</template>

<script>
import {getAddMedia, getDeleteMedia, getPageMedia, getUpdateMedia, getPageMediaowner, getPageCategory} from '../../api/api.js';
export default {
  data() {
    return {
      pageNo: 1,
      total: 0,
      mediaList: [],
      mediaOwnerList: [],
      mediaCategoryList: [],
      createMediaVisible: false,
      editMediaVisible: false,
      mediaListLoading: false,
      editMediaForm: {mediaId: "", categoryId: "", mediaownerId: "", title: "", url: ""},
      createMediaForm: {categoryId: "", mediaownerId: "", title: "", url: ""},
    };
  },
  mounted() {
  	this.getPageMedia();
    this.getPageMediaowner();
    this.getPageCategory();
  },
  methods: {
  	createMediaModelHandle() {
      this.createMediaForm.categoryId = "";
      this.createMediaForm.mediaownerId = "";
      this.createMediaForm.title = "";
      this.createMediaForm.url = "";
      this.createMediaVisible = true;
    },
    createMediaHandle() {
      getAddMedia(this.createMediaForm).then((res) => {
        let data = res.data;
        if(data.code == 0 ){
          this.$message({
            message: '媒体创建成功',
            type: 'success'
          });
          this.createMediaVisible = false;
          this.getPageMedia();
        } else {
          this.$message.error(`${data.msg}`);
        }
      })
    },
    getPageMediaowner() {
      let params = {
        pageNo: this.pageNo,
        pageSize: 100
      }
      getPageMediaowner(params).then((res) => {
        if(res.data.code == 0) {
          let data = res.data.data;
          this.mediaOwnerList = data.recordList;
        }
      });
    },
    getPageCategory() {
      let params = {
        pageNo: this.pageNo,
        pageSize: 100
      }
      getPageCategory(params).then((res) => {
        if(res.data.code == 0) {
          let data = res.data.data;
          this.mediaCategoryList = data.recordList;
        }
      });
    },
    editMediaHandle() {
      getUpdateMedia(this.editMediaForm).then((res) => {
        let data = res.data;
        if(data.code == 0 ){
          this.$message({
            message: '媒体信息修改成功',
            type: 'success'
          });
          this.editMediaVisible = false;
          this.getPageMedia();
        } else {
          this.$message.error(`${data.msg}`);
        }
      })
    },
    handleCurrentChange(val) {
       this.pageNo = val;
       this.getPageMedia();
    },
    getPageMedia() {
      let params = {
        pageNo: this.pageNo,
        pageSize: 10
      }
      this.mediaListLoading = true;
      getPageMedia(params).then((res) => {
        if(res.data.code == 0) {
          let data = res.data.data;
          this.mediaList = data.recordList;
          this.mediaListLoading = false;
          this.total = Number(data.totalCount);
        }
      });
    },
    editMediaDropdpwn(row) {
      this.editMediaVisible = true;
      this.editMediaForm.id = row.id;
      this.editMediaForm.categoryId = row.mediaownerId;
      this.editMediaForm.title = row.title;
      this.editMediaForm.url = row.url;
      this.editMediaForm.categoryId = row.categoryId;
      this.editMediaForm.mediaownerId = row.mediaownerId;
    },
    removeMediaDropdpwn(row) {
      this.$confirm(`此操作将永久删除该媒体, 是否继续?`, `${row.title}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getDeleteMedia({mediaId: row.id}).then((res) => {
            let data = res.data;
            if(data.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPageMedia();
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
    },
    getMediaOwnerTitle(id) {
        let title = '';
        for(let i in this.mediaOwnerList) {
            if(id == this.mediaOwnerList[i].id) {
                title = this.mediaOwnerList[i].title;
            }
        }
        return title;
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