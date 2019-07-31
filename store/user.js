// ### 思路

// 使用`vuex`统一管理用户登录注册行为和用户信息。
// 1. 在`store`文件夹新建`user.js`
// 2. 在`store/user.js`中实现登录，并保存数据到`store`的`state`中
// 3. 在头部组件中显示用户信息


// 保存数据的属性 state
// 如果不使用函数的方式会报警告
export const state = () => {
  return {
    userInfo: {
      token: '',
      user: {}
    }
  }
}

// 组件怎么读取store数据:this.$store.state
// 怎么把值存储到store中:使用方法 this.$store.commit('方法的文件名/方法名')
// 通过vuex插件，把数据存储到本地，本地的数据也会同步到store


// 同步修改数据 mutations
export const mutations = () => ({

  //存储数据
  // state 就是上面的state，这个参数是固定默认的
  // data 使用调用该方法时候传入的数据
  setuserInfo(state, data) {
    state.setuserInfo = data
  }
})

// 清除用户数据
export const actions = () => ({
  
})
