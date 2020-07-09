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
      <el-form :model="adVertisersForm">
        <el-form-item label="广告主名称" label-width="100px">
           <!-- v-model="adVertisersForm" -->
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商务" label-width="100px">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
           <!-- v-model="" -->
          <el-radio-group size="mini">
            <el-radio label="1" border>启用</el-radio>
            <el-radio label="2" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createAdVertisersVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createAdVertisersVisible = false">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************创建广告主Module end*****************-->

    <!--*****************广告主列表 start*****************-->
    <el-table>
       <!-- v-if="" border :data="" highlight-current-row v-loading="" -->
      <el-table-column align="center" prop="day" label="名称"></el-table-column>
      <el-table-column align="center" prop="ch" label="广告数量"></el-table-column>
      <el-table-column align="center" prop="name" label="商务"></el-table-column>
      <el-table-column align="center" prop="name" label="状态"></el-table-column>
          <el-table-column align="center" label="操作项" width="150">
        <template slot-scope="scope">
          <el-button size="small" plain @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--*****************广告主列表 end*****************-->
	</section>
</template>

<script>
  export default {
    data() {
      return {
        createAdVertisersVisible: false, //广告主模态框
        adVertisersForm: {}, //创广告组创建from
      	filters: {},
      };
    },
    mounted() {
    	//
      console.log(this.$route)
    },
    methods: {
    	createAdHandle() {
        this.createAdVertisersVisible = true;
      }
    }
  }
</script>