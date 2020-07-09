<template>
  <div class="login-box">
  <h1 class="logo"></h1>
  <el-form :model="userRuleForm" :rules="rulesUserInfo" ref="userRuleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="userRuleForm.account" @keyup.enter.native="handleSubmit" auto-complete="off" placeholder="请输入账号名称"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="userRuleForm.checkPass" @keyup.enter.native="handleSubmit" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import { requestLogin } from '../api/api';
  import Md5 from '../api/md5.js';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        userRuleForm: {
          account: '',
          checkPass: ''
        },
        rulesUserInfo: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: false
      };
    },
    mounted() {
      if(localStorage.getItem('userInfo')) {
        this.checked = true;
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.userRuleForm.account = userInfo.username;
        this.userRuleForm.checkPass = userInfo.password;
      }
    },
    methods: {
      handleSubmit(ev) {
        if(this.userRuleForm.account == 'admin' && this.userRuleForm.checkPass == 'admin0629') {
          sessionStorage.setItem('user', JSON.stringify(this.userRuleForm));
          this.$router.push({ path: '/welcomePage' });
        } else {
          this.$message({
            showClose: true,
            message: '用户名或密码错误，请联系管理员',
            type: 'error'
          });
        }
        // var _this = this;
        // let loginParams = { username: this.userRuleForm.account, password: this.userRuleForm.checkPass };
        // if(this.checked) localStorage.setItem('userInfo', JSON.stringify(loginParams));
        // else localStorage.removeItem('userInfo');
        // this.$refs.userRuleForm.validate((valid) => {
        //   if (valid) {
        //     this.logining = true;
        //     // let loginParams = { username: this.userRuleForm.account, password: Md5.md5(this.userRuleForm.checkPass) };
        //     let userInfo = JSON.stringify({...loginParams, date: new Date().toLocaleString()});
        //     let params = JSON.stringify(loginParams);
        //     requestLogin(params).then(data => {
        //       this.logining = false;
        //       let user = userInfo;
        //       if(data.status == 1) {
        //         sessionStorage.setItem('user', user);
        //         //登录时存入权限
        //         let permissions = data.data.permissions;
        //         let perms = JSON.stringify(permissions);
        //         sessionStorage.setItem('PERSLIST', perms);
        //         this.$router.push({ path: '/welcomePage' });
        //       } else {
        //         this.$message({
        //           showClose: true,
        //           message: `${data.msg}`,
        //           type: 'error'
        //         });
        //       }
        //     });
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-box {
    width: 100%;
    height: 100%;
    text-align: center;
    background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593496268317&di=41c46836cd3a2d9a28baf751a8b86354&imgtype=0&src=http%3A%2F%2Fwww.opseve.com%2Fpublic%2Fassets%2Fimg%2Fbackgrounds%2F1.jpg');
    background-size: 100%;
  }
  .logo {
    display: inline-block;
    width: 200px;
    height: 50px;
    margin: 20px auto;
    background: url('//s.opfed.com/spider/logo.png');
    background-repeat: no-repeat;
  }
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 20px auto;
    width: 450px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
