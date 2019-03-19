// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import '../static/css/animation.css'
import { Dialog,Toast } from 'vant';
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(router)
import {
  Lazyload
} from 'vant'
import VueTouch from 'vue-touch'
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
Vue.use(vueg, router, {
  tabs: [{ //由于底部的圆点导航类似于tab导航，都是水平转场效果，所以填入这个配置项，可以参考vueg配置项
    name: 'guide1'
  }, {
    name: 'guide2'
  }, {
    name: 'guide3'
  }, {
    name: 'guide4'
  }]
})
import {
  DatePicker,
  Rate,
  Tag,
  Button
} from 'element-ui';
Vue.use(DatePicker)
Vue.use(Rate)
Vue.use(Tag)
Vue.use(Button)
Vue.use(VueTouch, {
  name: 'v-touch'
})
// import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
// import 'swiper/dist/css/swiper.css'

// Vue.use(VueAwesomeSwiper, /* { default global options } */)


require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
// import VueDPlayer from 'vue-dplayer'
// import 'vue-dplayer/dist/vue-dplayer.css'
// import 'vue-plyr'
// import 'vue-plyr/dist/vue-plyr.css'

// import AMap from 'vue-amap';
// Vue.use(AMap);

//   // 初始化vue-amap
// AMap.initAMapApiLoader({
//   // 高德key
//   key: '05a3281fcf402e30cc9be8289061794c',
//   // 插件集合 （插件按需引入）
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder','AMap.Geolocation']
// });

import qs from 'qs'
import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 创建axios实例
axios.interceptors.request.use(
  config => {
    if (localStorage["Token"]) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers["token"] = localStorage.getItem("Token")
    }
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
axios.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    console.log(response.data.code)
    let code = response.data.code;
    if (code == 666) {
      Dialog.confirm({
        message: "登陆已过期，请重新登陆",
        confirmButtonText: "去登陆"
      }).then(() => {
        Toast.clear()
        router.push("/login")
      })
      .catch(() => {});
      return Promise.resolve(response)       
    }else{
        return Promise.resolve(response)
    }
  },
  error => {
    console.log('err：' + error); // for debug
    alert(error.message)
    return Promise.reject(error);
  }
);
Vue.prototype.axios = axios;


Vue.use(Vant)
Vue.use(Lazyload)
// Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  // if (to.matched.some(function(item) {
  //         return item.meta.guide
  //     })) {
  //     if (localStorage.isguide) {
  //         console.log("666")
  //         next({ path: "/moyu" })
  //     } else {
  //         next()
  //     }
  // }


  // if (!localStorage.isguide) {
  //     if (to.name != 'guide1' && to.name != 'guide2' && to.name != 'guide3' && to.name != 'guide4') {
  //         next({
  //             name: "guide1" // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //         });
  //     }
  // } else {
  //     next()
  // }

  if (to.matched.some(function (item) {
      return item.meta.login
    })) {
    if (!localStorage["Token"]) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
