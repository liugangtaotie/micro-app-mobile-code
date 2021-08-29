<template>
  <div class="home-model tcenter">
    <van-divider />
    <van-button class="flex mt10" type="primary" @click="gotoMainHome"
      >子应用，跳转基座主页</van-button
    >
    <van-divider />
    <van-button class="flex mt10" type="primary" @click="$router.push('/about')"
      >home,点击跳转about</van-button
    >
    <div class="flex flex_center single">
      store的count数据 <span class="ml20 f30 t2">{{ $store.state.moduleMain.count }}</span>
    </div>
    <van-button class="flex mt10" type="primary" @click="onClickAdd">add +</van-button>
    <van-button style="margin-left: 10px" class="flex mt10" type="primary" @click="onClickSub"
      >dec -</van-button
    >

    <my-footer :active="0"></my-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Home",
})
export default class Home extends Vue {
  [x: string]: any;
  private signToShow: Boolean = false; //
  private num: number = 0;
  private active: number = 0;
  private activeTab: number = 0;

  created() {}

  // 跳转sub-first
  gotoMainHome() {
    history.pushState(null, null, "/main-home");

    // 主动触发一次popstate事件
    window.dispatchEvent(new PopStateEvent("popstate", { state: null }));
  }

  mounted() {
    this.num = this.$store.state.moduleMain.count;
  }

  onClickAdd() {
    this.$store.commit("moduleMain/increment");
  }

  onClickSub() {
    this.$store.commit("moduleMain/subtraction");
  }
}
</script>

<style lang='less' scoped>
.home-model {
  width: 100%;
  height: 100vh;
  padding: 10px;
}

.my-swipe .van-swipe-item {
  font-size: 20px;
  line-height: 150px;
  color: #fff;
  text-align: center;
  background-color: #07c160;
}

.single {
  width: 100%;
  height: 50px;
  margin-top: 20px;
}
</style>
















