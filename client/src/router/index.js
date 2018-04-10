import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Clients from '@/components/Client/Clients'
import CreateClient from '@/components/Client/CreateClient'
import ViewClient from '@/components/Client/ViewClient'
import EditClient from '@/components/Client/EditClient'

import CreateDropin from '@/components/Dropin/CreateDropin'
import Dropins from '@/components/Dropin/Dropins'
import ViewDropin from '@/components/Dropin/ViewDropin'
import EditDropin from '@/components/Dropin/EditDropin'

import CreateCounsellingSession from '@/components/Counselling/CreateCounsellingSession'
import CounsellingSessions from '@/components/Counselling/CounsellingSessions'
import ViewCounsellingSession from '@/components/Counselling/ViewCounsellingSession'
import EditCounsellingSession from '@/components/Counselling/EditCounsellingSession'

import CreateInteraction from '@/components/Interaction/CreateInteraction'
import EditInteraction from '@/components/Interaction/EditInteraction'
import Interactions from '@/components/Interaction/Interactions'
import ViewInteraction from '@/components/Interaction/ViewInteraction'

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
    },
    {
      path: '/interactions/create',
      name: 'interaction-create',
      component: CreateInteraction
    },
    {
      path: '/interactions',
      name: 'interactions',
      component: Interactions
    },
    {
      path: '/interactions/:interactionId',
      name: 'interaction',
      component: ViewInteraction
    },
    {
      path: '/interactions/:interactionId/edit',
      name: 'interaction-edit',
      component: EditInteraction
    }
  ]
})
