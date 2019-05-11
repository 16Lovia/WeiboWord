<template>
  <div id="main">
        <flat-surface-shader class="shader" type="webgl" :light="{ambient: '#22bc9e', diffuse: '#2b7c6b'}">
        </flat-surface-shader>
            <div class="mask">
            <div class="title">
                HOW WORDS WORK
            </div>
            <div class="subtitle">
                An Exploration of Weibo Data
            </div>

            <lottie class="lottie" :options="defaultOptions" :height="400" :width="400" v-on:animCreated="handleAnimation"/>

            <ParticleEffectButton class="pebtn"
            :visible.sync="btnOps.visible"
            :animating.sync="btnOps.animating"
            :options="btnOps"
            cls="btn-cls"
            >
            GO
            </ParticleEffectButton>
        </div>
    
  </div>
</template>
<script>
import Lottie from 'vue-lottie';
import * as animationData from '../../../public/json/1055-world-locations.json';
import ParticleEffectButton from "vue-particle-effect-buttons"
import $ from 'jquery';

  export default {
    name: 'app',
    components: {
      'lottie': Lottie,
       ParticleEffectButton
    },
    data() {
      return {
        defaultOptions: {animationData: animationData.default},
        animationSpeed: 1,

        btnOps: {
            type: "triangle",
            easing: "easeOutQuart",
            size: 6,
            particlesAmountCoefficient: 4,
            oscillationCoefficient: 2,
            color: function () {
            return Math.random() < 0.5 ? "#000000" : "#ffffff";
            },
            onComplete: () => {
            },
            onBegin: () => {
            this.$router.push({
                path: '/sevenimg',   
            }) 
            console.log("begin");
            },
            visible: true,
            animating: false
        },
      }
    },
    methods: {
      handleAnimation: function (anim) {
        this.anim = anim;
      },

      stop: function () {
        this.anim.stop();
      },

      play: function () {
        this.anim.play();
      },

      pause: function () {
        this.anim.pause();
      },

      onSpeedChange: function () {
        this.anim.setSpeed(this.animationSpeed);
      },

    }
  }
</script>

<style>
html, body {
margin: 0;
padding: 0;
}
.shader {
width: 100vw;
height: 100vh;
z-index: -1;
}
.mask {
width: 100%;
height: 100vh;
position: absolute;
background-color: rgba(0, 0, 0, 0.6);
top: 0;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: rgba(255, 255, 255,0.9);
z-index: 0;
}
.title {
font-size: 7em;
font-family: Teko, sans-serif;
text-shadow: 4px 4px rgba(0,0,0,0.2);
}
.subtitle {
font-family: Avenir,Helvetica,Arial,sans-serif;
font-size: 1.7em;
margin-bottom: 30px;
}
.lottie{
width: 50%;
height: 10vh;
position: absolute;
/* background-color: rgba(0, 0, 0, 0.6); */
top: 0;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: rgba(255, 255, 255,0.9);
z-index: 1;
}
.pebtn{
width: 50%;
height: 10vh;
position: relative;
/* background-color: rgba(0, 0, 0, 0.6); */
top: 0;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
z-index: 2;
}
.vue-particle-effect-button .particles-button {
background: #e6a13dd9;
}
</style>