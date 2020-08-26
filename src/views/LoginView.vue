<template>
    <div class='login'>
        <el-card shadow="hover" class="card">
            <div slot="header">
              <span class="head">系统登录</span>
            </div>
           <el-form :model="form" status-icon :rules="rules" ref="form" label-width="3rem" class="login_form">
              <el-form-item label="用户" prop="username">
                <el-input v-model.number="form.username" class="input" clearable
                prefix-icon="el-icon-user-solid"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" autocomplete="off" class="input" clearable
                prefix-icon="fa fa-eye"
                ></el-input>
              </el-form-item>
              <div class="btns">
                <el-button class="btn"  type="success" @click="submitForm(form)" icon="fa fa-sign-in">登录</el-button>
                <el-button class="btn" type="warning" @click="resetForm(form)" icon="fa fa-refresh">重置</el-button>
              </div>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { mapActions } from "vuex";
// import types from '@/store/types';
import LocalStore from '@/utils/LocalStore';
import  '../styles/login.scss';
export default {
  name: 'LoginView',
  props: {
 
  },
  components:{
   
  },
  data () {
    var validateName = (rule, value, callback) => {
        if (!value) {
           return callback(new Error('用户名不能为空'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
       
      return {
        form: {
          username: LocalStore.get('username',''),
          password: '',
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validateName, trigger: 'blur' }
          ]
        }
      };
  },
  methods:{
    ...mapActions(["user_login"]),
      submitForm(form){
        this["user_login"](form)
      },
      resetForm(){
         this.username='';
         this.password='';
      }
  },
  computed: {
    
  }
}
</script>