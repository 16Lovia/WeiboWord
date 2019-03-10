import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// openlayers 的样式库
import 'ol/ol.css';
// ol-ext 的样式库
import 'ol-ext/dist/ol-ext.min.css';


// 加载 Element 配置
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
  size: 'small'
});


new Vue({
  render: h => h(App),
}).$mount('#app')
