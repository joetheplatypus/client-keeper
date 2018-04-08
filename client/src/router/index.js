import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Clients from '@/components/Clients'
/* import CreateClient from '@/components/CreateClient'
import ViewClient from '@/components/ViewClient'
import EditClient from '@/components/EditClient' */

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients
    }
    /*     {
      path: '/clients/create',
      name: 'clients-create',
      component: CreateClient
    },
    {
      path: '/clients/:clientId',
      name: 'client',
      component: ViewClient
    },
    {
      path: '/clients/:clientId/edit',
      name: 'clients-edit',
      component: EditClient
    } */
  ]
})
