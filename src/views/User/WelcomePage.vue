<template>
	<div class="home-box">
		<h2>欢迎进入</h2>
		<!-- <div class="home-user">
			<p>用户登录信息</p>
			<el-table :data="userData" class="user-tabel" :border="true">
		      <el-table-column prop="username" align="center" label="用户名"></el-table-column>
		      <el-table-column prop="date" align="center" label="登录时间"></el-table-column>
		      <el-table-column prop="ip" align="center" label="IP"></el-table-column>
		    </el-table>
		</div -->
	</div>
</template>

<script>
  export default {
    data() {
      return {
        userData: []
      };
    },
    methods: {
      //
    },
    mounted() {
    	let user = sessionStorage.getItem('user');
		if (user) {
			this.userData.push(JSON.parse(user));
		}
    }
  }

</script>
<style scoped lang="scss">
.home-box {
	width: 100%;
	h2 {
		text-align: center;
	}
}
.home-user {
	width: 100%;
	/* border: 1px solid; */
	padding: 10px;
	p {
		height: 30px;
		text-align: center;
		line-height: 30px;
	}
}
.user-tabel {
	margin: 50px 0;
}
</style>