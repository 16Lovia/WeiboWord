<template>
 <div id="main">
    <flat-surface-shader class="shader" type="webgl" :light="{ambient: '#22bc9e', diffuse: '#2b7c6b'}"></flat-surface-shader>
    <div class="mask">
    <hierarchical-edge-bundling class="graph-root" ref="graph" :maxTextWidth="50" identifier="id" :duration="duration" @mouseNodeOver="mouseNodeOver" @mouseNodeOut="mouseNodeOut" :data="tree" :links="links" node-text="text" :margin-x="marginX" :margin-y="marginY"/>
    <el-button @click="toVue">Next</el-button>
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

Object.assign(data, {
  duration: 750,
  marginX: 30,
  marginY: 30,
  events: [],
  loading: false,
  highlightedNode: null,
  tree: data.Graph.tree,
  links: data.Graph.links
})

export default {
  name: 'app',
  data () {
    return data
  },
  components: {
    hierarchicalEdgeBundling,
    EventLogger
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
      console.log(eventName, data)
      this.events.push({eventName, data: data.data})
    },
    mouseNodeOver (event) {
      this.onEvent('mouseNodeOver', event)
      this.changeCurrent(event.element)
    },
    mouseNodeOut (event) {
      this.onEvent('mouseNodeOut', event)
      this.changeCurrent(null)
    },

  },
  watch: {
    highlightedNode (value) {
      this.$refs['graph'].highlightedNode = value
    }
  }
}
</script>

<style>
.tree {
  height: 400px;
  width: 100%;
}

.graph-root {
  height: 600px;
  width: 100%;
  z-index: 0;
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
</style>
