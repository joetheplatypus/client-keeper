<template>
  <div>
    <v-layout row wrap>
      <v-container fluid grid-list-md>
        <h1>All Clients</h1><br />
        <v-flex xs8 offset-xs2>
          <v-card>
            <router-link :to="{ name: 'clients-create' }">
              <v-btn fixed bottom right fab><v-icon>add</v-icon></v-btn>
            </router-link>
          </v-card>
          <v-layout row wrap>
            <v-flex xs1 offset-xs1>
              <v-container>
                 <v-icon>search</v-icon>
              </v-container>
            </v-flex>
            <v-flex xs8>
              <v-text-field name="search" label="Search" v-model="search"></v-text-field>
            </v-flex>
            <v-flex xs4 v-for="client in clients" :key="client.id">
              <v-card>
                <v-card-title primary-title class="justify-center"><h3 class="headline mb-0">{{client.name}}</h3></v-card-title>
                <v-card-text>{{client.email}}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <router-link class="no-decoration" :to="{ name: 'client', params: { clientId: client.id }}">
                    <v-btn flat color="orange">More</v-btn>
                  </router-link>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-container>
    </v-layout>

  </div>
</template>

<script>
import ClientService from '@/services/ClientService'

export default {
  data () {
    return {
      clients: null,
      search: ''
    }
  },
  watch: {
    search (value) {
      const route = {
        name: 'clients'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    },
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.search = value
        this.clients = (await ClientService.index(value)).data
      }
    }
  }
}

</script>

<style scoped>
.no-decoration {
  text-decoration: none
}
</style>
