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

// 微前端，基座与子应用注册与开启
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
      }],
      'sub-third': [{
        loader(code: string) {
          if (import.meta.env.MODE === 'development') {
            code = code.replace(/(from|import)(\s*['"])(\/micro-app\/sub-third\/)/g, (all) => {
              return all.replace('/micro-app/sub-third/', 'http://localhost:8083/micro-app/sub-third/')
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

window.microApp = microApp;

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
