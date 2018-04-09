import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Clients from '@/components/Clients'
import CreateClient from '@/components/CreateClient'
import ViewClient from '@/components/ViewClient'
import EditClient from '@/components/EditClient'

import CreateDropin from '@/components/CreateDropin'
import Dropins from '@/components/Dropins'
import ViewDropin from '@/components/ViewDropin'
import EditDropin from '@/components/EditDropin'

import CreateCounsellingSession from '@/components/CreateCounsellingSession'
import CounsellingSessions from '@/components/CounsellingSessions'
import ViewCounsellingSession from '@/components/ViewCounsellingSession'
import EditCounsellingSession from '@/components/EditCounsellingSession'

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
    },
    {
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
    },
    {
      path: '/dropins/create',
      name: 'dropins-create',
      component: CreateDropin
    },
    {
      path: '/dropins',
      name: 'dropins',
      component: Dropins
    },
    {
      path: '/dropins/:dropinId',
      name: 'dropin',
      component: ViewDropin
    },
    {
      path: '/dropins/:dropinId/edit',
      name: 'dropins-edit',
      component: EditDropin
    },
    {
      path: '/counselling/create',
      name: 'counselling-session-create',
      component: CreateCounsellingSession
    },
    {
      path: '/counselling',
      name: 'counselling-sessions',
      component: CounsellingSessions
    },
    {
      path: '/counselling/:sessionId',
      name: 'counselling-session',
      component: ViewCounsellingSession
    },
    {
      path: '/counselling/:sessionId/edit',
      name: 'counselling-session-edit',
      component: EditCounsellingSession
    }
  ]
})
