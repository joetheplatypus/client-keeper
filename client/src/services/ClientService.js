import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('clients', {
      params: {
        search: search
      }
    })
  },
  show (clientId) {
    return Api().get(`clients/${clientId}`)
  },
  post (client) {
    return Api().post('clients', client)
  },
  put (client) {
    return Api().put(`clients/${client.id}`, client)
  },
  delete (clientId) {
    return Api().delete(`clients/${clientId}`)
  },
  dropins (clientId) {
    return Api().get(`clients/${clientId}/dropins`)
  },
  counselling (clientId) {
    return Api().get(`clients/${clientId}/counselling`)
  },
  interactions (clientId) {
    return Api().get(`clients/${clientId}/interactions`)
  }
}
