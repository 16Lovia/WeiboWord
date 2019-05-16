<template>
        <el-card class="log">
          <div v-for="(event,index) in events" :key="index">
            <p><b>Name:</b> {{event.eventName}} <b>Data:</b>{{event.data.text}}</p>
          </div>
        </el-card>
</template>
<script>
export default {
  props: {
    events: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.log  {
  position: absolute;
  height: auto;
  text-align: left;
  right: 10em;
}
</style>