import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./assets/js/store"


Vue.config.productionTip = false

// 加载 Element 配置
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
  size: 'small'
});

//粒子背景效果
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
//折射背景效果
import FlatSurfaceShader from 'vue-flat-surface-shader'
Vue.use(FlatSurfaceShader)

Vue.config.productionTip = false;

// // openlayers 的样式库
// import 'ol/ol.css';
// // ol-ext 的样式库
// import 'ol-ext/dist/ol-ext.min.css';


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
