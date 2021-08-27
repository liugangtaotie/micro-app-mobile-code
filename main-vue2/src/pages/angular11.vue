<template>
  <div class="angular11">
    <micro-app
        name='angular11'
        url='http://localhost:6001/micro-app/angular11'
        baseurl='/angular11'
        :data='data'
        inline
      >
      <!-- destory inline scopecss='false' -->
      </micro-app>
  </div>
</template>

<script>
import 'zone.js'

export default {
  name: 'angular11',
   data () {
    return {
      data: {from: '来自基座的初始化数据'}
    }
  },
  methods: {}
}
</script>

<style>

</style>
