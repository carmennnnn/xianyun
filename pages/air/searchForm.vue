// 封装搜索组件:搜索表单的交互比较多，而且功能比较独立，所以封装成组件导入
<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <!-- 表单 -->
    <el-form class="search-form-content" ref="form" label-width="80px" :model="form">
      <el-form-item label="出发城市">
        <!-- 相关组件介绍:`el-autocomplete`远程搜索组件 -->
        <!-- 组件文档：<https://element.eleme.cn/#/zh-CN/component/input#yuan-cheng-sou-suo> -->
        <!-- autocomplete 是一个可带输入建议的输入框组件，fetch-suggestions 是一个返回输入建议的方法属性-->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          class="el-autocomplete"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          :trigger-on-focus="false"
          @select="handleDepartSelect"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          class="el-autocomplete"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          :trigger-on-focus="false"
          @select="handleDestSelect"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- DatePicker 日期选择器 -->
        <!-- 组件文档：<https://element.eleme.cn/#/zh-CN/component/date-picker#xuan-ze-ri> -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width:100%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>

      <!-- 搜索按钮 -->
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>

      <!-- 换 -->
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      //当前被选的选项
      currentTab: 0,
      //   定义表单数据的5个值
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },

  methods: {
    //tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$alert("暂时不支持往返", "提示", { type: "warning" });
      }
    },

    //   value: 是选中输入框的值
    //   cb：回调函数，必须要调用，接收要展示的列表,接收的参数格式是固定的,必须是一个数组，数组中每一项必须是一个对象
    //   对象中必须包含value属性

    //   出发城市输入框获得焦点时触发
    queryDepartSearch(value, cb) {
      //没有输入框的值时返回空
      if (!value) {
        cb([]);
        return;
      }

      this.$axios({
        url: "/airs/city",
        //   设置get请求的参数
        params: { name: value }
      }).then(res => {
        const { data } = res.data;
        console.log("123" + res.data);

        //   循环给每一项数据添加一个vaule属性
        const newData = [];
        data.forEach(v => {
          v.value = v.name.replace("市", "");
          newData.push(v);
          console.log(newData);
        });

        this.form.departCity = newData[0].value;
        this.form.departCode = newData[0].sort;

        cb(newData);
      });
    },
    //   目标城市输入框获得焦点时触发
    queryDestSearch(value, cb) {
      //没有输入框的值时返回空
      if (!value) {
        cb([]);
        return;
      }

      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        const { data } = res.data;

        //   循环给每一项数据添加一个vaule属性
        const newData = [];
        data.forEach(v => {
          //   .replace()将字符串中的某些字符替换成新的字符
          v.value = v.name.replace("市", "");
          newData.push(v);
          console.log(newData);
        });

        //设置第一个为选中的默认值
        this.form.destCity = newData[0].value;
        this.form.destCode = newData[0].sort;

        cb(newData);
      });
    },
    //出发城市下拉选择时触发
    // item代表当前选中项
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },
    //到达城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destcode = item.sort;
    },
    //确认选择时间日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    //提交表单时触发
    handleSubmit() {
      // 表单验证
      if (!this.form.departCity) {
        this.$alert("出发城市不能为空", "提示", { type: "warning" });
        return;
      }

      if (!this.form.destCity) {
        this.$alert("到达城市不能为空", "提示", { type: "warning" });
        return;
      }

      if (!this.form.departDate) {
        this.$alert("时间不能为空", "提示", { type: "warning" });
        return;
      }

      //跳转到机票列表页
      this.$router.push({
        path: "/air/flights",
        // query获取url的5个参数
        query: this.form
      });
    },
    //切换出发和到达城市时触发
    handleReverse() {
      const { departCity, destCity, departCode, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    }
  }
};
</script>


 
 


<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
