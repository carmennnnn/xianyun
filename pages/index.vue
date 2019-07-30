<template>
  <div class="container">
    <!-- 新增首页轮播图布局 -->
    <!-- 
				1. 使用`Element-ui`的幻灯片组件`el-carousel`实现轮播图
    		2. 使用`this.$axios`请求后台轮播图接口
    3. 在模板中使用`$axios.defaults.baseURL`替换图片地址, 请求后端接口替换静态图片数据-->
    <!-- interval: 间隔时间  arrow：出现箭头-->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
                background:url(${ $axios.defaults.baseURL + item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 实现搜索框布局 -->
    <!-- 
				1. 添加搜索框布局
    		2. 搜索框`tab`切换执行不同的操作
    3. 搜索跳转-->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item, index) in options"
            :key="index"
            :class="{active: index === currentOption}"
            @click="handleOption(index)"
          >
            <i>{{item.name}}</i>
          </span>
        </el-row>

        <!-- options搜索框tab选项 
						currentOption当前选中的选项
						placeholder当前选项的输入提示文字
						searchValue 搜索框的值
        handleSearch-->
        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input
            :placeholder="options[currentOption].placeholder"
            v-model="searchValue"
            @keyup.enter.native="handleSearch"
            clearable
          />
          <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>
// nuxt默认把 axios 添加到原型
// import axios from "axios";
// Vue.prototype.$axios = axios;
<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [
        {
          url: "http://157.122.54.189:9095/assets/images/th03.jfif"
        },
        {
          url: "http://157.122.54.189:9095/assets/images/th04.jfif"
        }
      ],
      options: [
        // 搜索框tab选项
        {
          name: "攻略",
          placeholder: "搜索城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl: "/hotel?city="
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          pageUrl: "/air"
        }
      ],
      searchValue: "", // 搜索框的值
      currentOption: 0 // 当前选中的选项
    };
  },
  // 使用后台接口,用动态数据替代静态数据
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      console.log(1233);
      console.log(res);
      const { data } = res.data;
      this.banners = data;
    });
  },
  // 功能的实现
  methods: {
    // tab栏操作:实现切换效果，并且判断如果切换的机票`tab`，那么直接跳转到机票首页
    handleOption(index) {
      console.log(index); //点击tab栏对应索引0.1.2
      // 设置点击当前tab为当前选中的选
      this.currentOption = index;

      // 如果切换的机票tab，那么直接跳转到机票首页
      const item = this.options[index];
      console.log(item);
      if (item.name === "机票") {
        return this.$router.push(item.pageUrl); //pageUrl: "/air"
      }
    },
    // 搜索时候触发
    handleSearch() {
      console.log("--------------");
      console.log(this.options); //name: "攻略" pageUrl: "/post?city=" placeholder: "搜索城市"....
      const item = this.options[currentOption];
			console.log(item);
			// 跳转时候给对应的页面url加上搜索内容参数
    this.$router.push(item.pageUrl + this.searchValue);
    }
  }
};
</script>
// Scoped CSS规范是Web组件产生不污染其他组件，也不被其他组件污染的CSS规范。
//  <style lang="less" scoped>
// .container {
//   width: 100%;;
//   margin: 0 auto;
//   position: relative;
// }
// // /deep/修改当前这个的样式，在其他页面用到el-carousel的时候不变
// // /deep/ .el-carousel__container {
// //   height: 700px;
// // }
// /deep/ .el-carousel__container {
//   height: 700px;
// }
// .banner-image {
//   width: 100%;
//   height: 100%;
// }
//
</style>
<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>