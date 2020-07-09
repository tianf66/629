<template>
  <section>
    <!--*****************头部工具条 start*****************-->
    <el-col :span="24" class="toolbar">
      <el-form class="el-form" :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="createAdHandle">创建广告</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-input placeholder="请输入关键字查询" v-model="filters.keyWord" clearable></el-input>
        </el-form-item> -->
      </el-form>
    </el-col>
    <!--*****************头部工具条 end*****************-->

    <!--*****************创建广告Module start*****************-->
    <el-dialog title="创建广告" :visible.sync="createAdVisible">
      <el-form :model="adForm">
        <el-form-item label="广告主" label-width="100px"><el-input autocomplete="off"></el-input></el-form-item>
        <el-form-item label="名称" label-width="100px"><el-input autocomplete="off"></el-input></el-form-item>
        <el-form-item label="展现形式" label-width="100px"><el-input autocomplete="off"></el-input></el-form-item>
        <el-form-item label="尺寸" label-width="100px"><el-input autocomplete="off"></el-input></el-form-item>
        <el-form-item label="适配类型" label-width="100px"><el-input autocomplete="off"></el-input></el-form-item>
        <el-form-item label="绑定下游" label-width="100px"><el-input autocomplete="off"></el-input></el-form-item>
        <el-form-item label="代码" label-width="100px"> <el-input type="textarea"></el-input></el-form-item>
        <el-form-item label="是否外放" label-width="100px">
          <el-radio-group size="mini">
            <el-radio label="1" border>是</el-radio>
            <el-radio label="2" border>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createAdVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createAdVisible = false">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************创建广告Module end*****************-->

    <!--*****************广告列表 start*****************-->
     <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column align="center" prop="date" label="ID" width="150"></el-table-column>
    <el-table-column align="center" fixed prop="name" label="广告名称" width="120"></el-table-column>
    <el-table-column align="center" prop="province" label="广告主" width="120"></el-table-column>
    <el-table-column align="center" prop="city" label="状态" width="120"></el-table-column>
    <el-table-column align="center" prop="address" label="是否外放" width="300"></el-table-column>
    <el-table-column align="center" prop="zip" label="绑定渠道" width="120"></el-table-column>
    <el-table-column align="center" fixed="right" label="操作项" width="120">
      <template slot-scope="scope">
        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">查看代码</el-button>
        <el-button type="text" size="small">绑定日志</el-button> -->
        <el-dropdown>
          <span class="el-dropdown-link">
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>编辑</el-dropdown-item>
            <el-dropdown-item>查看代码</el-dropdown-item>
            <el-dropdown-item>绑定日志</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
    <!--*****************广告列表 end*****************-->
  </section>
</template>

<script>
  export default {
    data() {
      return {
        createAdVisible: false, //广告主模态框
        adForm: {}, //创广告组创建from
        filters: {},
         tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      };
    },
    mounted() {
      //
      console.log(this.$route)
    },
    methods: {
      createAdHandle() {
        this.createAdVisible = true;
      },
      handleClick(row) {
        console.log(row);
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