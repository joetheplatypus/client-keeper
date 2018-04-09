<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Edit an existing client</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field label="Name" required  v-model="client.name"></v-text-field>
          <v-text-field label="Email" required  v-model="client.email"></v-text-field>
          <div class="error" v-html="error" />
          <v-btn @click="save">Save</v-btn>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import ClientService from '@/services/ClientService'

export default {
  data () {
    return {
      client: {
        name: '',
        email: ''
      },
      error: null
    }
  },
  methods: {
    async save () {
      try {
        await ClientService.put(this.client)
        this.$router.push({
          name: 'client',
          params: {
            clientId: this.$route.params.clientId
          }
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async load () {
      const response = (await ClientService.show(this.$route.params.clientId)).data
      if (response.error) {
        this.error = response.error
      } else {
        this.client = response
      }
    }
  },
  async mounted () {
    this.load()
  }
}

</script>

<style scoped>

</style>
