<template lang="html">
<div id="main">
  <vue-particles  class="particles-js" color="#dedede"></vue-particles>
  <div class="dashboard">
    <div class="flex-container column">
        <div class="item one"  @click="clickChart('1')" style="transform: translate(-22.4%,-33.5%) scale(0.33)">
        </div>
        <div class="item two" @click="clickChart('2')" style="transform: translate(-22.4%,0.5%) scale(0.33)">
        </div>
        <div class="item three" @click="clickChart('3')" style="transform: translate(-22.4%,34.5%) scale(0.33)">
        </div>
        <div class="item four active" @click="clickChart('4')" style="transform: translate(43.7%, 0) scale(1)">
        </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery';
import bus from '../../components/bus.js';

export default {
  components: {
  },
  props:{
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    _resize() {
      this.$root.charts.forEach((myChart) => {
        myChart.resize()
      })
    },
    init() {
      this.items = document.querySelectorAll('.flex-container .item')
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].dataset.order = i + 1;
      }
    },
    clickChart(clickIndex) {
      let activeItem = document.querySelector('.flex-container .active')
      let activeIndex = activeItem.dataset.order
      let clickItem = this.items[clickIndex - 1]
      if (activeIndex === clickIndex) {
        return
      }
      activeItem.classList.remove('active')
      clickItem.classList.add('active')
      this._setStyle(clickItem, activeItem)
    },
    _setStyle(el1, el2) {
      let transform1 = el1.style.transform
      let transform2 = el2.style.transform
      el1.style.transform = transform2
      el2.style.transform = transform1
    },
  }, // methods
  created() {
    bus.$on('dashboardResize', event => {
      // TODO
    });

    
  }, // created
  mounted() {
    this.init()
  }, // mounted
}
</script>

<style lang="stylus" scoped>
*
  box-sizing: border-box;
.point,.multipleColumn,.columnChart,.line
  height 100%!important
  width 100%!important
  background none!important
.item
  padding: 0px;
  margin: 0px;
  width: 68%;
  height: 100%;
  position absolute
  transform scale(0.33)
  text-align: center;
  transition:all 0.8s;
  background rgba(32, 32, 35, 0.5)
  z-index 999
  overflow: hidden;
.dashboard
  position absolute
  width 100%
  height 100%
  margin:0px;
  padding:0px;
  padding-top 5%
  background-size 100% 100%
.flex-container.column
  position relative
  height: 90%;
  width: 90%;
  overflow: hidden;
  margin:  0 auto 100px auto;
  box-sizing: content-box;
.active
  height 100%
  width: 69%;
  margin-left: 10px;
  line-height: 0;
.bottom-btn{
  bottom: 0;
  width: 100%;
  height: 10%;
  position: absolute;
  margin: 20px;
}
.more-btn
  width: 30%;
  height: 100%;
  float right
  font-size: 35px;
  position: relative;
  margin-right: 13%;
.next-btn
  width: 30%;
  height: 100%;
  float left
  font-size: 35px;
  position: relative;
  margin-left: 13%;
.el-button--primary 
    color: #FFF;
    background-color: rgb(191, 158, 148);
    border-color: #409eff00;
.particles-js
  position: absolute;
  background-image url(/time_line.jpg)
  background-color #bf9e94
  background-size: cover; 
  top: 0; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  overflow-y: hidden; 
  overflow:hidden;
  z-index: 0; 
.three_content
  position relative
  padding 60px
  top: 0; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  box-sizing: content-box;
  color: white;
  font-size: -webkit-xxx-large;
.el-button--primary:focus, .el-button--primary:hover
    background: #e6a23c;
    border-color: #e6a23c;
    color: #FFF;
#main
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
</style>
