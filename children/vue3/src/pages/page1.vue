<template>
  <div>
    <img src="../assets/logo.png" alt="">
    <HelloWorld msg="Welcome to Vue@3.0.7"/>
    <div class='msg-title'>{{microDataStr}}</div>
    <br />
    <router-link to="/page2">
      <el-button type="primary" plain>跳转element-plus</el-button>
    </router-link>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'Page1',
  data () {
    return {
      centerDialogVisible: false,
      microDataStr: '',
    }
  },
  created () {
    window.microApp && window.microApp.addDataListener(this.handleDataChange)
  },
  beforeUnmount () {
    window.microApp && window.microApp.removeDataListener(this.handleDataChange)
  },
  components: {
    HelloWorld
  },
  methods: {
    handleDataChange (data) {
      console.log('vue3 来自基座应用的数据', data)
      this.centerDialogVisible = true
      this.microDataStr = JSON.stringify(data)
    }
  }
}
</script>

<style>

</style>
