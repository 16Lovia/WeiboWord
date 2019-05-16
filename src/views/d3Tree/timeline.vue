<template>
<div>
    <vue-funnel-graph :width="width" :height="height" :labels="labels"
              :values="values" :colors="colors" :sub-labels="subLabels" :direction="direction"
              :gradient-direction="gradientDirection"
              :animated="true" :display-percentage="false"
></vue-funnel-graph>
</div>
</template>

<script>
import { VueFunnelGraph } from 'vue-funnel-graph-js';

export default {
  components: {
      VueFunnelGraph
  },
  props: {
    flag: {
        type: Number,
        required: true
    },
    timeline_size:{
        type:Array,
        required: true
    }
  },
  data() {
      return {
        //   labels: ['Impressions', 'Add To Cart', 'Buy'],
        newvalues:[],
        labels:[
                    "2019-02",
                    "2019-03",
                    "2019-04",
                ],
          subLabels: ['Direct', 'Social Media', 'Ads'],
          values: [
          // with the given Labels and SubLabels here's what the values represent:
          // 
          // Direct, Social, Ads  
          //    |      |     |  
          //    v      v     v
              [3000, 2500, 6500], // Segments of "Impressions" from top to bottom
              [3000, 1700, 1000], // Segments of "Add To Cart"
              [600,  200,  130]   // Segments of "Buy"
          ],
          colors: [
              ['#FFB178', '#FF3C8E'], // color set for "Impressions" segment
              ['#A0BBFF', '#EC77FF'], // color set for "Add To Cart" segment
              ['#A0F9FF', '#7795FF']  // color set for "Buy" segment
          ],
          direction: 'horizontal',
          gradientDirection: 'horizontal',
          height: this.timeline_size[0],
          width: this.timeline_size[1]
      };
  },
  methods:{
      onInit(){
          this.values=([this.flag+200,this.flag,this.flag-1000])
      }
  },
  watch: {
      flag(cur,old){
          if(cur!=old)this.onInit()
      },
  }
}
</script>

<style>
.svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label .label__value {
    font-size: 4px;
    color: #fff;
    /* line-height: 18px; */
    /* margin-bottom: 6px; */
}
.svg-funnel-js__labels .svg-funnel-js__label .label__title {
    font-size: 2px;
    font-weight: bold;
    color: #21ffa2;
}
.svg-funnel-js:not(.svg-funnel-js--vertical) {
    padding-top: 30px;
    /* padding-bottom: 16px; */
}
.svg-funnel-js .svg-funnel-js__subLabels {
    display: flex;
    justify-content: center;
    /* margin-top: 24px; */
    position: absolute;
    width: 100%;
    left: 0;
}
.svg-funnel-js .svg-funnel-js__subLabels .svg-funnel-js__subLabel .svg-funnel-js__subLabel--color {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 2px 8px 2px 0;
}
.svg-funnel-js .svg-funnel-js__subLabels .svg-funnel-js__subLabel {
    display: flex;
    font-size: 0.5px;
    color: #fff;
    /* line-height: 16px; */
}
.svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label .label__segment-percentages {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    left: 0;
    /* padding: 8px 24px; */
    box-sizing: border-box;
    background-color: rgba(8, 7, 48, 0.8);
    /* margin-top: 24px; */
    opacity: 0;
    transition: opacity 0.1s ease;
    cursor: default;
}
.svg-funnel-js .svg-funnel-js__labels .svg-funnel-js__label .label__segment-percentages {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    left: 0;
    padding: 8px 24px;
    box-sizing: border-box;
    background-color: rgba(8, 7, 48, 0.8);
    /* margin-top: 24px; */
    opacity: 0;
    transition: opacity 0.1s ease;
    cursor: default;
}
</style>