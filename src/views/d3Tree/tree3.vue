<template>
 <div id="main">
    <flat-surface-shader class="shader" type="webgl" :light="{ambient: '#22bc9e', diffuse: '#2b7c6b'}"></flat-surface-shader>
    <div class="mask">
      <hierarchical-edge-bundling class="graph-root" ref="graph" :maxTextWidth="50" identifier="id" :duration="duration" @mouseNodeOver="mouseNodeOver" @mouseNodeOut="mouseNodeOut" :data="tree" :links="links" node-text="text" node-value="value":margin-x="marginX" :margin-y="marginY"/>
    <!-- <el-button @click="toVue">Next</el-button> -->
    <!-- <event-logger :events="events"/> -->
     	 <div class="char">
          <!-- <radar class="radar"></radar> -->
          <!-- <rose v-bind:flag ="id":class="rose" ></rose> -->
        </div>
        <div id="time">
          <timeline v-bind:flag ="id" v-bind:timeline_size ="timeline_size"></timeline>
        </div>
    </div>
  </div>
</template>


<script>
import hierarchicalEdgeBundling from './HierarchicalEdgeBundling.vue'
//  import rawVm from '../../data/DiscogsClientvm'
//  import rawVm from '../../data/nhibernatevm'
import data from '../../assets/data/data.json'
import CircularJson from 'circular-json'
import EventLogger from './EventLogger'
import timeline from './timeline'

// import Chart from './mychart.vue'
// import dd from './mychart.vue'
// import rose from './rose.vue'
// const vm = CircularJson.parse(rawVm)

// const data = {
//   duration: 750,
//   marginX: 30,
//   marginY: 30,
//   events: [],
//   loading: false,
//   highlightedNode: null,
//   tree: vm.Graph.tree,
//   links: vm.Graph.links
// }

// Object.assign(data, {
//   duration:750,
//   marginX: 30,
//   marginY: 30,
//   events: [],//事件触发+节点信息数组
//   loading: false,
//   highlightedNode: null,
//   tree: data.Graph.tree,
//   links: data.Graph.links,
// 	id: 5000,
// })

export default {
  name: 'app',
  data () {
      return {
          duration:750,
          marginX: 30,
          marginY: 30,
          events: [],//事件触发+节点信息数组
          loading: false,
          highlightedNode: null,
          tree: data.Graph.tree,
          links: data.Graph.links,
          id: 5000,
          timeline_size:[30,600]
      }
     //return data
  },
  components: {
    hierarchicalEdgeBundling,
    EventLogger,
    timeline,
	  // 'radar':dd,
	  // 'rose' : rose
  },
  methods: {
    toVue(){
    this.$router.push({
    path: '/sevenimg',   
    }) 
    },
    changeCurrent (value) {
      this.loading = true
      window.setTimeout(() => {
        this.highlightedNode = value
        this.loading = false
      })
    },
    onEvent (eventName, data) {
      // console.log(eventName, data)//触发事件eventName data 节点信息
      this.events.push({eventName, data: data.data})
    },
    mouseNodeOver (event) {
      this.onEvent('mouseNodeOver', event)
      this.changeCurrent(event.element)
	    this.id =  event.element._id * 100
	    
    },
    mouseNodeOut (event) {
      this.onEvent('mouseNodeOut', event)
      this.changeCurrent(null)
    },
    timelinesize(){
     var size = document.getElementById("time")
      console.log(size)
      // this.timeline_size[0]=size.offsetWidth
      // this.timeline_size[1]=size.offsetHeight
    }

  },
  watch: {
    highlightedNode (value) {
      this.$refs['graph'].highlightedNode = value
    }
  },
  created(){
    this.timelinesize()
  }
  
  
  
}
</script>

<style>
.tree {
  height: 400px;
  width: 100%;
}

.graph-root {
  height: 550px;
  width: 50%;
  z-index: 0;
  position: absolute;
  left:0;
  top:0;
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
.char {
  height: 30vh;
  width: 30%;
  z-index: 0;
  position: absolute;
  right:0;
  top:0;
  color: rgba(255, 25, 255,0.9);
}
#time {
  height: 15vh;
  width: 100%;
  z-index: 0;
  position: absolute;
  left:0;
  bottom:3vh;
	color: rgba(25, 255, 255,0.9);
}
</style>