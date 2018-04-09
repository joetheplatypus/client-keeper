import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('counselling', {
      params: {
        search: search
      }
    })
  },
  show (sessionId) {
    return Api().get(`counselling/${sessionId}`)
  },
  post (session) {
    return Api().post('counselling', session)
  },
  put (session) {
    return Api().put(`counselling/${session.id}`, session)
  }
}
