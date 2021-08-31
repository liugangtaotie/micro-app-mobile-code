import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "./registerServiceWorker.ts";
import router from "./router";
import store from "./store";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import "./assets/css/flex.css";
import microApp from '@micro-zoe/micro-app'

// Add lazyload directive
import VueLazyload from "vue-lazyload";
import errorImg from '@ASS/images/defaultPhoto.png';
import loadingImg from '@STA/img/loading.gif';

// 全局样式
import "./assets/css/theme.less";
import "vant/lib/index.less"; // 全局引入样式

import cfg from "./api/appConfig";
import * as filters from "./api/filters";
import resDefaultImg from '@ASS/images/defaultPhoto.png'
import docDefaultImg from '@ASS/images/defaultPhoto.png'
import sealDefaultImg from '@ASS/images/defaultPhoto.png'

// 添加图片预览组件
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
let options = {
  fullscreenEl: false,
};
Vue.use(preview, options);

import {
  Area,
  List,
  Cell,
  Icon,
  Button,
  CellGroup,
  Empty,
  Field,
  Col,
  Row,
  RadioGroup, Radio,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Toast,
  Tab,
  Tabs,
  Divider,
  Tabbar,
  TabbarItem,
  ActionSheet,
  Search,
  IndexBar,
  IndexAnchor,
  Popup,
  Picker,
  Switch,
  TreeSelect,
  Dialog,
  Progress,
  PullRefresh,
  Loading,
  Tag,
  Stepper,
  SwipeCell,
  Step,
  Sticky,
  Steps,
  Swipe,
  SwipeItem,
  Uploader,
  DatetimePicker,
  Image as VanImage,
  CountDown,
  NavBar,
  Calendar,
  NoticeBar
} from "vant";
// 调试
// import Vconsole from 'vconsole'
// let vConsole:any = new Vconsole()
// Vue.use(vConsole)

Vue.use(Area);
Vue.use(List);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(Button);
Vue.use(CellGroup);
Vue.use(Empty);
Vue.use(Field);
Vue.use(Col);
Vue.use(Row);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Divider);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(ActionSheet);
Vue.use(Search);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Switch);
Vue.use(TreeSelect);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Progress);
Vue.use(PullRefresh);
Vue.use(Tag);
Vue.use(Stepper);
Vue.use(SwipeCell);
Vue.use(Step);
Vue.use(Sticky);
Vue.use(Steps);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Uploader);
Vue.use(DatetimePicker);
Vue.use(VanImage);
Vue.use(CountDown);
Vue.use(NavBar);
Vue.use(Calendar);
Vue.use(NoticeBar);

Vue.config.devtools = true;
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]));
Vue.prototype.$cfg = cfg;
Vue.prototype.$cfg.resDefaultImg = resDefaultImg;
Vue.prototype.$cfg.docDefaultImg = docDefaultImg;
Vue.prototype.$cfg.sealDefaultImg = sealDefaultImg;
Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;
Vue.use(Vuex);
Vue.use(preview);
Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  error: errorImg,
  loading: loadingImg
});

// 微前端，基座与子应用开启
microApp.start({
  lifeCycles: {
    created() {
      console.log('created 全局监听')
    },
    beforemount() {
      console.log('beforemount 全局监听')
    },
    mounted() {
      console.log('mounted 全局监听')
    },
    unmount() {
      console.log('unmount 全局监听')
    },
    error() {
      console.log('error 全局监听')
    }
  },
  plugins: {
    modules: {
      'sub-first': [{
        loader(code: string) {
          if (import.meta.env.MODE === 'development') {
            code = code.replace(/(from|import)(\s*['"])(\/micro-app\/sub-first\/)/g, (all) => {
              return all.replace('/micro-app/sub-first/', 'http://localhost:8081/micro-app/sub-first/')
            })
          }
          return code
        }
      }],
      'sub-second': [{
        loader(code: string) {
          if (import.meta.env.MODE === 'development') {
            code = code.replace(/(from|import)(\s*['"])(\/micro-app\/sub-second\/)/g, (all) => {
              return all.replace('/micro-app/sub-second/', 'http://localhost:8082/micro-app/sub-second/')
            })
          }
          return code
        }
      }]
    }
  },
})

function dataListener (data) {
  console.log('全局数据', data)
}

/**
 * 绑定监听函数
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时有缓存数据，是否需要主动触发一次，默认为false
 */
microApp.addGlobalDataListener(dataListener)

// 解除绑定
// microApp.removeGlobalDataListener(dataListener)

// // 清空所有全局数据的绑定函数
// microApp.clearGlobalDataListener()

/**
 * 发布 － 订阅模式
 */
//定义一个新闻发布平台
//主要功能包括任务发布大厅(informationWarehouse)，以及订阅任务(subscribe)，发布任务(release)
let task = {
  informationWarehouse: {},
  subscribe(key, fn) {
      if (typeof this.informationWarehouse[key] === "undefined") {
          this.informationWarehouse[key] = []
      }
      this.informationWarehouse[key].push(fn) // 订阅的消息推送到调度中心
  },
  release(type, news) {
      let fns = this.informationWarehouse[type]
      // 如果调度中心没有这个资源，返回结束
      if (typeof fns === "undefined" || fns.length === 0) return;
      fns.forEach(fn => {
          fn(news);
      })
  }
}
console.log("----- 订阅 -----");
// 订阅 娱乐头条
task.subscribe('娱乐', val => {
  console.log('小王订阅的娱乐头条', JSON.stringify(val))
})
// 订阅 科技头条
task.subscribe('科技', val => {
  console.log('小刘订阅的科技头条', JSON.stringify(val))
})
// 订阅 历史头条
task.subscribe('历史', val => {
  console.log('小李订阅的历史头条', JSON.stringify(val))
})
/**
* 系统推送头条
*/
console.log("----- 发布 -----");
task.release('娱乐', {
  title: "大衣哥给儿媳妇红包的言外之意",
  url: "https://www.toutiao.com/a6966769740203262478"
})
task.release('科技', {
  title: "192号段发放在即 中国广电5G渐近",
  url: "https://www.toutiao.com/a6966480940277334535"
})
task.release('历史', {
  title: "袁隆平的父母何许人也？",
  url: "https://www.toutiao.com/a6966099280075424267"
})
console.log("调度中心", task.informationWarehouse);

/**
 * 导航钩子
 */
router.beforeEach((to:any, from, next) => {
  document.title = to.meta.title || "micro-app";
  return next();
});

// 全局方法 this. 的调用方式
declare module 'vue/types/vue' {
  // eslint-disable-next-line prettier/prettier
  interface Vue {
    $tools: any
    $api: any
    $cfg: any
    $toast: Toast
    $dialog: Dialog
  }
}

new Vue({
  router,
  store,
  render: (h: (arg0: any) => any) => h(App),
}).$mount("#app");
