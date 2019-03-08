import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Thanks from './views/Thanks.vue'
import DataList from './views/DataList.vue'
import GetUser from './views/GetUser.vue'
import UpdateUser from './views/UpdateUser'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/thanks/:id',
      name: 'thanks',
      component: Thanks
    },
    {
      path: '/data',
      name: 'data',
      component: DataList
    },
    {
      path: '/user/:id',
      name: 'user',
      component: GetUser
    },
    {
      path: 'update/:id',
      name: 'update',
      component: UpdateUser
    }

  ]
})
