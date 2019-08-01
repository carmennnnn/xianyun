<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
import AsyncValidator from "async-validator";
export default {
  data() {
    //确认密码的校验 --element ul组件的表单里自定义校验规则
    // rule当前的规则
    // value 输入框的值
    // callback回调函数，必须要调用的，不调用就不会验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "", // 登录用户名/手机
        password: "", // 登录密码
        checkPassword: "", // 确认密码
        nickname: "", // 昵称
        captcha: "" // 手机验证码
      },

      // 表单验证规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      // 判断手机号是否为空
      if (!this.form.username) {
        this.$message.warning("请输入正确的手机号");
        return;
      }
      // if (this.form.username.length !== 11) {
      //   this.$confirm("手机号码格式错误", "提示", {
      //     confirmButtonText: "确定",
      //     showCancelButton: false,
      //     type: "warning"
      //   });
      //   return;
      // }
      //调用 手机验证的接口
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        console.log(res);
        console.log(666);
        const { code } = res.data;
        this.$confirm(`当前验证码为:${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },

    // 注册
    handleRegSubmit() {
      console.log(this.form);
      this.$refs.form.validate(valid => {
        console.log(valid);
        // ES6的标准语法，解构出特定的属性后，剩余的属性可以用... +变量名访问
        const { checkPassword, ...Content } = this.form;

        if (valid) {
          this.$axios({
            url: `/accounts/register`,
            method: "POST",
            data: Content
          }).then(res => {
            console.log("注册成功" + res);
            this.$store.commit("user/setuserInfo");
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