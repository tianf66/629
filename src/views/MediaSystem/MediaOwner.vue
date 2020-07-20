<template>
  <section>
    <!--*****************头部工具条 start*****************-->
    <el-col :span="24" class="toolbar">
      <el-form class="el-form" :inline="true">
        <el-form-item>
          <el-button @click="createMediaOwnerHandle">创建媒体主</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--*****************头部工具条 end*****************-->


    <!--*****************创建媒体Module start*****************-->
    <el-dialog title="创建媒体主" :visible.sync="createMediaOwnerVisible">
      <el-form :model="createMediaOwnerForm" :rules="rules" ref="ruleForm">
        <el-form-item label="媒体主名称" label-width="100px" required>
          <el-input v-model="createMediaOwnerForm.title" autocomplete="off" placeholder="请填创建媒体主名称"></el-input>
        </el-form-item>
        <el-form-item label="对接商务姓名" label-width="110px" required>
          <el-input v-model="createMediaOwnerForm.businessmanName" autocomplete="off" placeholder="请填创建媒体主商务人员的姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" label-width="100px" required>
          <el-input v-model="createMediaOwnerForm.contacterName" autocomplete="off" placeholder="请填创建媒体主的联系电话"></el-input>        </el-form-item>
        <el-form-item label="联系人手机号" prop="contacterPhone" required label-width="110px">
          <el-input v-model="createMediaOwnerForm.contacterPhone" autocomplete="off" placeholder="请填创建媒体主联系人手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" required label-width="100px">
          <el-input v-model="createMediaOwnerForm.email" autocomplete="off" placeholder="请填创建媒体主邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createMediaOwnerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createMediaHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************创建媒体Module end*****************-->

    <!--*****************编辑媒体Module start*****************-->
    <el-dialog title="编辑媒体主" :visible.sync="editMediaOwnerVisible">
      <el-form :model="editMediaOwnerForm" :rules="rules" ref="ruleForm">
        <el-form-item label="媒体主名称" label-width="100px" required>
          <el-input v-model="editMediaOwnerForm.title" autocomplete="off" placeholder="请填创建媒体主名称"></el-input>
        </el-form-item>
        <el-form-item label="对接商务姓名" label-width="110px" required>
          <el-input v-model="editMediaOwnerForm.businessmanName" autocomplete="off" placeholder="请填创建媒体主商务人员的姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" label-width="100px" required>
          <el-input v-model="editMediaOwnerForm.contacterName" autocomplete="off" placeholder="请填创建媒体主的联系电话"></el-input>        </el-form-item>
        <el-form-item label="联系人手机号" prop="contacterPhone" required label-width="110px">
          <el-input v-model="editMediaOwnerForm.contacterPhone" autocomplete="off" placeholder="请填创建媒体主联系人手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" required label-width="100px">
          <el-input v-model="editMediaOwnerForm.email" autocomplete="off" placeholder="请填创建媒体主邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editMediaOwnerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editMediaHandle">OK</el-button>
      </div>
    </el-dialog>
    <!--*****************编辑媒体Module end*****************-->


    <!--*****************媒体主列表 start*****************-->
    <el-table border :data="mediaOwnerList" highlight-current-row v-loading="mediaListLoading">
      <el-table-column align="center" prop="title" label="媒体主"></el-table-column>
      <el-table-column align="center" prop="businessmanName" label="对接商务姓名"></el-table-column>
      <el-table-column align="center" prop="contacterName" label="联系人姓名"></el-table-column>
      <el-table-column align="center" prop="contacterPhone" label="联系人手机号"></el-table-column>
      <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
      <el-table-column align="center" label="操作项" width="150">
        <template slot-scope="scope">
          <el-dropdown>
          <span class="el-dropdown-link">
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><div @click="editMediaOwnerDropdpwn(scope.row)">编辑</div></el-dropdown-item>
            <!-- <el-dropdown-item><div @click="updateAdvertiserStatusDropdpwn(scope.row)">修改状态</div></el-dropdown-item> -->
            <el-dropdown-item><div @click="removeMediaOwnerDropdpwn(scope.row)" style="color: red;">删除</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--*****************媒体主列表 end*****************-->

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;"></el-pagination>
    </el-col>
  </section>
</template>

<script>
import {getAddMediaowner, getDeleteMediaowner, getPageMediaowner, getUpdateMediaowner} from '../../api/api.js';
export default {
  data() {
      var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      createMediaOwnerVisible: false,
      editMediaOwnerVisible: false,
      mediaListLoading: false,
      createMediaOwnerForm: {
        businessmanName: "",
        contacterName: "",
        contacterPhone: "",
        email: "",
        title: "",
      },
      editMediaOwnerForm: {
        businessmanName: "",
        contacterName: "",
        contacterPhone: "",
        email: "",
        title: "",
      },
      mediaOwnerList: [],
      pageNo: 1,
      total: 0,
      rules: {
        contacterPhone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.getPageMediaowner();
  },
  methods: {
    createMediaOwnerHandle() {
      this.createMediaOwnerVisible = true;
      this.createMediaOwnerForm.businessmanName = "";
      this.createMediaOwnerForm.contacterName = "";
      this.createMediaOwnerForm.contacterPhone = "";
      this.createMediaOwnerForm.email = "";
      this.createMediaOwnerForm.title = "";
    },
    createMediaHandle() {
      getAddMediaowner(this.createMediaOwnerForm).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.$message({
            message: '媒体主创建成功',
            type: 'success'
          });
          this.getPageMediaowner();
          this.createMediaOwnerVisible = false;
        } else {
          this.$message.error(`${data.msg}`);
        }
      });
    },
    editMediaHandle() {
      getUpdateMediaowner(this.editMediaOwnerForm).then((res) => {
        let data = res.data;
        if(data.code == 0) {
          this.$message({
            message: '媒体主信息修改成功',
            type: 'success'
          });
          this.getPageMediaowner();
          this.editMediaOwnerVisible = false;
        } else {
          this.$message.error(`${data.msg}`);
        }
      });
    },
    handleCurrentChange(val) {
       this.pageNo = val;
       this.getPageMediaowner();
    },
    getPageMediaowner() {
      let params = {
        pageNo: this.pageNo,
        pageSize: 10
      }
      this.mediaListLoading = true;
      getPageMediaowner(params).then((res) => {
        if(res.data.code == 0) {
          let data = res.data.data;
          this.mediaOwnerList = data.recordList;
          this.mediaListLoading = false;
          this.total = Number(data.totalCount);
        }
      });
    },
    editMediaOwnerDropdpwn(row) {
      this.editMediaOwnerForm.businessmanName = row.businessmanName;
      this.editMediaOwnerForm.contacterName = row.contacterName;
      this.editMediaOwnerForm.contacterPhone = row.contacterPhone;
      this.editMediaOwnerForm.email = row.email;
      this.editMediaOwnerForm.title = row.title;
      this.editMediaOwnerVisible = true;
    },
    removeMediaOwnerDropdpwn(row) {
        this.$confirm(`此操作将永久删除该媒体主, 是否继续?`, `${row.title}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getDeleteMediaowner({mediaownerId: row.id}).then((res) => {
            let data = res.data;
            if(data.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPageMediaowner();
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