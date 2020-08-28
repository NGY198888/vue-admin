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
                <el-button class="btn"  type="success" @click="submitForm(form)" icon="fa fa-sign-in">账号登录</el-button>
                 <el-button class="btn" type="primary" @click="loginGithub()" icon="fa fa-github">github登录</el-button>
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
import request from '@/utils/request';
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
  beforeMount(){
     let logined=this.getQueryValue('logined')
     if(logined){
        logined = unescape(logined)
        logined=JSON.parse(logined)
        console.log(logined);
        this["user_logined"](logined)
     }
  },
  methods:{
    ...mapActions(["user_login","user_logined"]),
      submitForm(form){
        this["user_login"](form)
      },
      resetForm(){
         this.username='';
         this.password='';
      },
      getQueryValue(queryName) {
          var query = decodeURI(window.location.search.substring(1));
          var vars = query.split("&");
          for (var i = 0; i < vars.length; i++) {
              var pair = vars[i].split("=");
              if (pair[0] == queryName) { return pair[1]; }
          }
          return null;
      },
      loginGithub(){
          request.get('/login/github').then(res=>{
              window.location.href=res.data
          });
      }
  },
  computed: {
    
  }
}
</script>