import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('dropins', {
      params: {
        search: search
      }
    })
  },
  show (dropinId) {
    return Api().get(`dropins/${dropinId}`)
  },
  post (dropin) {
    return Api().post('dropins', dropin)
  },
  put (dropin) {
    return Api().put(`dropins/${dropin.id}`, dropin)
  }
}
