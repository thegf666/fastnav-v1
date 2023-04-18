import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NavList from "./components/NavList.vue"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import AddWeb from "./components/AddWeb.vue"
import Index from './views/index.vue'
import fn from './app.js'

Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.component("NavList", NavList)
Vue.component("Header", Header)
Vue.component("Footer", Footer)
Vue.component("AddWeb", AddWeb)


const routes = [
    {path: '/', component: Index}
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

Vue.filter("$firstText", function (value) {
    let n = (value.trimLeft()).toString()
    return n.charAt(0);
});
Vue.config.productionTip = false
Vue.prototype.fn = fn

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
