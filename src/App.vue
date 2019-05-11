<template>
  <div id="app">
      <!-- <Compare_Slider msg="Welcome to HistoryGIS"/> -->
      <!-- 使用animate跳转页面的动画效果： -->
      <!-- 方式一： -->
      <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="fadeIn">
              <router-view class="animated"></router-view>
      </transition>
      <!-- 方式二： -->
      <!-- <transition mode="out-in" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
        <router-view class="animated"></router-view>
      </transition>   -->
    </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
@import 'assets/css/animate.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
