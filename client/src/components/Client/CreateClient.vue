<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Create a new client</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field label="Name" required  v-model="client.name"></v-text-field>
          <v-text-field label="Email" required  v-model="client.email"></v-text-field>
          <div class="error" v-html="error" />
          <v-btn @click="create">Create</v-btn>
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
    async create () {
      try {
        await ClientService.post({
          name: this.client.name,
          email: this.client.email
        })
        const snackfunc = this.$parent.$parent.$parent.snack
        snackfunc('User ' + this.client.name + ' has been created')
        this.$router.push({name: 'clients'})
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}

</script>

<style scoped>

</style>
