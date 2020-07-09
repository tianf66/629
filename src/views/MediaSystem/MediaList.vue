<template>
	<section>
		<!--*****************头部工具条 start*****************-->
		<el-col :span="24" class="toolbar">
			<el-form class="el-form" :inline="true" :model="filters">
				<el-form-item>
					<el-button @click="createAdHandle">创建广告</el-button>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="请输入关键字查询" v-model="filters.keyWord" clearable></el-input>
				</el-form-item>
			</el-form>
		</el-col>
		<!--*****************头部工具条 end*****************-->
	</section>
</template>

<script>
  export default {
    data() {
      return {
      	filters: {
      		keyWord: ''
      	},
      };
    },
    mounted() {
    	//
    },
    methods: {
    	createAdHandle() {
        this.$router.push({path: '/mediasystem/createAd?from=mediasystem_adlist'});
      }
    }
  }
</script>