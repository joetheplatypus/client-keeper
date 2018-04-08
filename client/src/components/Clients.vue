<template>
  <div>
    <div v-for="client in clients" :key="client.id">
      {{client.name}}
      {{client.email}}
    </div>
  </div>
</template>

<script>
import ClientService from '@/services/ClientService'

export default {
  data () {
    return {
      clients: null
    }
  },
  async mounted () {
    this.clients = (await ClientService.index()).data
  }
}

</script>

<style scoped>

</style>
