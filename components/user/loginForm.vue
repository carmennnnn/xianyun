
<template>
  <!-- model: 表单数据对象 -->
  <!-- ref：获取dom元素 -->
  <!-- rules：表单校验规则 -->
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>
<script>

export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      //   表单规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },

  // 思路 :
  // 1. 在`components/user`中新建`loginForm.vue`表单组件
  // 2. 使用`Element-ui`的表单组件绑定数据和验证表单
  // 3. 调用登录接口
  methods: {
    // 提交登录
    handleLoginSubmit() {
      //   表单组件绑定数据  ref="form" 和 验证表单
      this.$refs.form.validate(valid => {
        console.log(valid);

        if (valid) {
          // 提交登录接口
          this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: this.form
          }).then(res => {
               console.log(res.data);
            // 保存到store, 要使用mutations的方法
            // this.$store.state.userlogin.userInfo = res.data;

            // mutations下的方法都必须使用commit来调用
            // 第一个参数是调用的方法名，第二个参数就是数据
            this.$store.commit("user/setUserInfo", res.data);

            // 跳转到首页
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
