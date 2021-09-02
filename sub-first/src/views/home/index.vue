<template>
  <div class="home-model tcenter">
    <van-grid class="flex flex_around" :gutter="10" :column-num="3">
      <van-grid-item icon="photo-o" text="sub-second" @click="gotoSubSecond" />
      <van-grid-item icon="photo-o" text="文字first" />
      <van-grid-item icon="photo-o" text="文字first" />
    </van-grid>
    <van-divider />
    <van-button class="flex mt10" type="primary" @click="gotoMainHome"
      >子应用sub-first，跳转基座主页</van-button
    >
    <van-divider />
    <van-button class="flex mt10" type="primary" @click="$router.push('/about')"
      >子应用sub-first,点击跳转about</van-button
    >
    <div class="flex flex_center single">
      global的count数据 <span class="ml20 f30 t2">{{ num }}</span>
    </div>
    <van-button class="flex mt10" type="primary" @click="onClickAdd">add +</van-button>
    <van-button style="margin-left: 10px" class="flex mt10" type="primary" @click="onClickSub"
      >dec -</van-button
    >

    <!-- <my-footer :active="0"></my-footer> -->
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
  private num: number = 100;
  private active: number = 0;
  private activeTab: number = 0;

  created() {}

  // 跳转sub-first
  gotoMainHome() {
    history.pushState(null, null, "main-home");

    // 主动触发一次popstate事件
    window.dispatchEvent(new PopStateEvent("popstate", { state: null }));

    setTimeout(() => {
      location.reload();
    }, 100);
  }

  // 跳转 sub-second
  gotoSubSecond() {
    history.pushState(null, null, "sub-second");
    // 主动触发一次popstate事件
    window.dispatchEvent(new PopStateEvent("popstate", { state: null }));

    setTimeout(() => {
      location.reload();
    }, 100);
  }

  mounted() {
    const count = this.num;
    window.microApp?.setGlobalData({ type: "全局数据", count });
    // this.num = this.$store.state.moduleMain.count;
  }

  onClickAdd() {
    const count = ++this.num;
    console.info("111111", count);
    window.microApp?.setGlobalData({ type: "全局数据", count });
    // this.$store.commit("moduleMain/increment");
  }

  onClickSub() {
    const count = --this.num;
    window.microApp?.setGlobalData({ type: "全局数据", count });
    // this.$store.commit("moduleMain/subtraction");
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
















