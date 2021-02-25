<template>
  <section>
    <!--*****************头部工具条 start*****************-->
    <el-col :span="24" class="toolbar">
      <el-form class="el-form" :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="createAdvertiser">创建广告位</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-input placeholder="请输入关键字查询" v-model="filters.keyWord" clearable></el-input>
        </el-form-item> -->
      </el-form>
    </el-col>
    <!--*****************头部工具条 end*****************-->


    <!--*****************创建广告Module start*****************-->
    <el-dialog title="创建广告" :visible.sync="createAdVisible">
      <el-form :model="createAdForm">
        <el-form-item label="广告名称" label-width="100px">
          <el-input v-model="createAdForm.title" autocomplete="off" placeholder="请填创建广告名称"></el-input>
        </el-form-item>
        <el-form-item label="广告主" label-width="100px">
          <el-select v-model="createAdForm.advertiserId" filterable clearable placeholder="请选择广告主">
            <el-option
              v-for="item in adVertisersList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展现形式" label-width="100px">
          <el-select v-model="createAdForm.showType" filterable placeholder="请选择广告形式">
            <el-option
              v-for="item in showAdType"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适配类型" label-width="100px">
          <el-select v-model="createAdForm.adaptertypeId" filterable placeholder="请选择适配类型">
            <el-option
              v-for="item in adaptationTypeList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="绑定下游" label-width="100px"><el-input v-model="createAdForm" autocomplete="off"></el-input></el-form-item> -->
        <el-form-item label="广告宽度" label-width="100px">
          <el-input v-model="createAdForm.width" type="number" autocomplete="off" placeholder="请填写广告宽度"></el-input>
        </el-form-item>
        <el-form-item label="广告高度" label-width="100px">
          <el-input v-model="createAdForm.height" type="number" autocomplete="off" placeholder="请填写广告高度"></el-input>
        </el-form-item>
        <el-form-item label="代码" label-width="100px">
          <el-input type="textarea" v-model="createAdForm.code" placeholder="请填写广告代码"></el-input>
        </el-form-item>
        <el-form-item label="是否外放" label-width="100px">
          <el-radio-group size="mini" v-model="createAdForm.usedByExternal">
            <el-radio label="1" border>是</el-radio>
            <el-radio label="2" border>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createAdVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createAdHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************创建广告Module end*****************-->


    <!--*****************编辑广告Module start*****************-->
    <el-dialog title="编辑广告" :visible.sync="editAdVisible">
      <el-form :model="editAdForm">
        <el-form-item label="广告名称" label-width="100px">
          <el-input v-model="editAdForm.title" autocomplete="off" placeholder="请填创建广告名称"></el-input>
        </el-form-item>
        <el-form-item label="广告主" label-width="100px">
          <el-select v-model="editAdForm.advertiserId" filterable clearable placeholder="请选择广告主">
            <el-option
              v-for="item in adVertisersList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展现形式" label-width="100px">
          <el-select v-model="editAdForm.showType" filterable placeholder="请选择广告形式">
            <el-option
              v-for="item in showAdType"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适配类型" label-width="100px">
          <el-select v-model="editAdForm.adaptertypeId" filterable placeholder="请选择适配类型">
            <el-option
              v-for="item in adaptationTypeList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告宽度" label-width="100px">
          <el-input v-model="editAdForm.width" type="number" autocomplete="off" placeholder="请填写广告宽度"></el-input>
        </el-form-item>
        <el-form-item label="广告高度" label-width="100px">
          <el-input v-model="editAdForm.height" type="number" autocomplete="off" placeholder="请填写广告高度"></el-input>
        </el-form-item>
        <el-form-item label="代码" label-width="100px">
          <el-input type="textarea" v-model="editAdForm.code" placeholder="请填写广告代码"></el-input>
        </el-form-item>
        <el-form-item label="是否外放" label-width="100px">
          <el-radio-group size="mini" v-model="editAdForm.usedByExternal">
            <el-radio :label="1" border>是</el-radio>
            <el-radio :label="2" border>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAdVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editAdHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************编辑广告Module end*****************-->


    <!--*****************修改广告主状态Module start*****************-->
    <el-dialog title="修改广告状态" :visible.sync="advertisementStatusVisible">
      <el-form>
        <el-form-item label="状态" label-width="100px">
          <el-radio-group v-model="advertisementStatusForm.status" size="mini">
            <el-radio :label="1" border>启用</el-radio>
            <el-radio :label="2" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdVertisersVisible = false">Cancel</el-button>
        <el-button type="primary" @click="advertisementStatusHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************修改广告主状态Module end*****************-->

    <!--*****************获取广告代码Module start*****************-->
    <el-dialog title="获取代码" :visible.sync="advertisementCodeVisible">
      <el-input type="textarea" :rows="5" v-model="advertisementCode" readonly></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="advertisementCodeVisible = false">Cancel</el-button>
      </div>
    </el-dialog>
    <!--*****************获取广告代码Module end*****************-->


    <!--*****************广告列表 start*****************-->
    <el-table :data="advertisementList" border style="width: 100%">
      <el-table-column align="center" prop="id" label="ID" width="180"></el-table-column>
      <el-table-column align="center" fixed prop="title" label="广告名称" width="120"></el-table-column>
      <el-table-column align="center" prop="advertiserTitle" label="广告主" width="120"></el-table-column>
      <el-table-column align="center" prop="zip" label="绑定媒体" width="120"></el-table-column>
      <el-table-column align="center" prop="width" label="宽度" width="100"></el-table-column>
      <el-table-column align="center" prop="height" label="高度" width="100"></el-table-column>
      <el-table-column align="center" prop="usedByExternal" label="是否外放" width="100">
        <template slot-scope="scope">{{scope.row.usedByExternal == 1 ? '是' : '否'}}</template>
      </el-table-column>
      <el-table-column align="center" prop="showType" label="展现形式" width="100">
        <template slot-scope="scope">{{scope.row.showType == 1 ? 'HTML' : '直投'}}</template>
      </el-table-column>
      <el-table-column align="center" prop="adaptertypeCode" label="适配类型CODE" width="150"></el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{scope.row.status == 1 ? "启用" : "禁用"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作项" width="200">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><div @click="editAdvertisementDropdpwn(scope.row)">编辑</div></el-dropdown-item>
              <el-dropdown-item><div @click="getAdCodeDropdpwn(scope.row)">获取代码</div></el-dropdown-item>
              <el-dropdown-item><div @click="bindMediaDropdpwn(scope.row)">绑定媒体</div></el-dropdown-item>
              <el-dropdown-item><div @click="advertisementStatusDropdpwn(scope.row)">修改状态</div></el-dropdown-item>
              <el-dropdown-item><div @click="getAdLog(scope.row)">查看日志</div></el-dropdown-item>
              <el-dropdown-item><div @click="removeAdvertisementDropdpwn(scope.row)" style="color: red;">删除</div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--*****************广告列表 end*****************-->


    <!--工具条-->
    <el-col :span="24" class="toolbar footer">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;"></el-pagination>
    </el-col>
  </section>
</template>

<script>
import {getPageAdvertisement, getPageAdvertiser, getAddAdvertisement, getPageAdaptertype, getDeleteAdvertisement, getUpdateAdvertisement,  getDeleteAdvertiser, getDisableAdvertisement, getEnableAdvertisement} from '../../../api/api.js';
export default {
  data() {
    return {
      pageNo: 1,
      total: 0,
      filters: {},
      advertisementCode: "",
      editAdVisible: false,
      createAdVisible: false,
      advertisementCodeVisible: false,
      advertisementList: [],
      adVertisersList: [],
      adaptationTypeList: [],
      showAdType: [{"id": 1, "title": "HTML"}, {"id": 2, "title": "直投"}],
      createAdForm: { //广告创建form
        adaptertypeId: "",//适配类型ID
        advertiserId: "",//广告主id
        code: "",//广告代码
        width: "",//
        height: "",//
        showType: "",//展示类型
        title: "",//标题
        usedByExternal: "",//是否外放:1是,2否
      },
      editAdForm: { //广告编辑form
        id: "",
        adaptertypeId: "",//适配类型ID
        advertiserId: "",//广告主id
        code: "",//广告代码
        width: "",//
        height: "",//
        showType: "",//展示类型
        title: "",//标题
        usedByExternal: "",//是否外放:1是,2否
      },
      advertisementStatusForm: {status: "", id: ""},
      advertisementStatusVisible: false
    };
  },
  mounted() {
    this.getPageAdvertiser();
    this.getPageAdaptertype();
    this.getPageAdvertisement();
  },
  methods: {
    createAdvertiser() {
      this.createAdVisible = true;
    },
    createAdHandle() {
      this.createAdForm.usedByExternal = Number(this.createAdForm.usedByExternal);
      this.createAdForm.width = Number(this.createAdForm.width);
      this.createAdForm.height = Number(this.createAdForm.height);
      getAddAdvertisement(this.createAdForm).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.$message({
            message: '广告创建成功',
            type: 'success'
          });
          this.getPageAdvertisement();
          this.createAdVisible = false;
        } else {
          this.$message.error(`${data.msg}`);
        }
      });
    },
    getPageAdvertiser() {
      let params = {
        pageNo: 1,
        pageSize: 100
      }
      getPageAdvertiser(params).then((res) => {
        if(res.data.code == 0) {
          let data = res.data.data;
          this.adVertisersList = data.recordList;
        }
      });
    },
    getPageAdvertisement() {
      let params = {
        pageNo: this.pageNo,
        pageSize: 10
      }
      getPageAdvertisement(params).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.advertisementList = data.data.recordList;
          this.total = Number(data.data.totalCount);
        }
      })
    },
    getPageAdaptertype() {
      let params = {
        pageNo: 1,
        pageSize: 100
      }
      getPageAdaptertype(params).then((res) => {
        if(res.data.code == 0) {
          let data = res.data.data;
          this.adaptationTypeList = data.recordList;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getPageAdvertisement();
    },
    removeAdvertisementDropdpwn(row) {
        this.$confirm(`此操作将永久删除该广告, 是否继续?`, `${row.title}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getDeleteAdvertisement({advertisementId: row.id}).then((res) => {
            let data = res.data;
            if(data.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPageAdvertisement();
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
    editAdvertisementDropdpwn(row) {
      this.editAdForm.id = row.id;
      this.editAdForm.adaptertypeId = row.adaptertypeId;
      this.editAdForm.advertiserId = row.advertiserId;
      this.editAdForm.code = row.code;
      this.editAdForm.width = row.width;
      this.editAdForm.height = row.height;
      this.editAdForm.showType = row.showType;
      this.editAdForm.title = row.title;
      this.editAdForm.usedByExternal = row.usedByExternal;
      this.editAdVisible = true;
    },
    editAdHandle() {
      getUpdateAdvertisement(this.editAdForm).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.$message({
            message: '广告修改成功',
            type: 'success'
          });
          this.getPageAdvertisement();
          this.editAdVisible = false;
        } else {
          this.$message.error(`${data.msg}`);
        }
      })
    },
    getDisableAdvertisement(advertisementId) {
      getDisableAdvertisement({advertisementId: advertisementId}).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.$message({
            message: '广告状态修改成功',
            type: 'success'
          });
          this.getPageAdvertisement();
          this.advertisementStatusVisible = false;
        } else {
          this.$message.error(`${data.msg}`);
        }
      })
    },
    getEnableAdvertisement(advertisementId) {
      getEnableAdvertisement({advertisementId: advertisementId}).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.$message({
            message: '广告状态修改成功',
            type: 'success'
          });
          this.getPageAdvertisement();
          this.advertisementStatusVisible = false;
        } else {
          this.$message.error(`${data.msg}`);
        }
      })
    },
    advertisementStatusHandle() {
      let status = this.advertisementStatusForm.status,
          advertisementId = this.advertisementStatusForm.id;
      status == 1 ? this.getEnableAdvertisement(advertisementId) : this.getDisableAdvertisement(advertisementId);
    },
    advertisementStatusDropdpwn(row) {
      this.advertisementStatusForm.status = row.status;
      this.advertisementStatusForm.id = row.id;
      this.advertisementStatusVisible = true;
    },
    getAdCodeDropdpwn(row) {
      this.advertisementCode = row.code;
      this.advertisementCodeVisible = true;
    },
    bindMediaDropdpwn(row) {
      //
    },
    getAdLog(row) {}
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
  .footer {
    margin: 100px 0;
  }
</style>