import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('interactions', {
      params: {
        search: search
      }
    })
  },
  show (interactionId) {
    return Api().get(`interactions/${interactionId}`)
  },
  post (interaction) {
    return Api().post('interactions', interaction)
  },
  put (interaction) {
    return Api().put(`interactions/${interaction.id}`, interaction)
  },
  delete (interactionId) {
    return Api().delete(`interactions/${interactionId}`)
  }
}
