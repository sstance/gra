import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});
import('element-ui/lib/theme-chalk/index.css')

import './components/iconSvg' // iconSvg

import '@/permission' // permission control

import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
 
//Vue.use(Viewer) 默认配置写法
//预览图片的写法
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})




Vue.config.productionTip = false;



new Vue({
  router,
  store,
  i18n,  // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: h => h(App),
}).$mount('#app')

