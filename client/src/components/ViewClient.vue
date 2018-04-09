<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Client Information</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
            <v-card>
              <router-link :to="{ name: 'clients-edit', params: { clientId: this.$route.params.clientId }}">
                <v-btn absolute top right fab><v-icon>edit</v-icon></v-btn>
              </router-link>
            </v-card>
          <div class="error">{{error}}</div>
          <v-subheader>Name</v-subheader>
          <h1>{{client.name}}</h1>
          <v-subheader>Email</v-subheader>
          <p>{{client.email}}</p>
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
      error: ''
    }
  },
  mounted () {
    this.load()
  },
  watch: {
    '$route' (to, from) {
      this.clear()
      this.load()
    }
  },
  methods: {
    load: async function () {
      const response = (await ClientService.show(this.$route.params.clientId)).data
      if (response.error) {
        this.error = response.error
      } else {
        this.client = response
      }
    },
    clear: function () {
      this.client.name = ''
      this.client.email = ''
      this.error = ''
    }
  }
}

</script>

<style scoped>

</style>
