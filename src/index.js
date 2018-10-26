import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Post from './components/Post.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueRouter)
import auth from './auth'

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

auth.checkAuth()

export var router = new VueRouter()

router.map({
  '/home': {
    component: Home
  },
  '/post': {
    component: Post
  },
  '/login': {
    component: Login
  },
  '/signup': {
    component: Signup
  }
})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')

