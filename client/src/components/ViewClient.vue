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
          <v-subheader>Attended Dropins</v-subheader>
          <v-data-table hide-headers :items=client.attendedDropins>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.date }}</td>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import ClientService from '@/services/ClientService'
import dateformat from 'dateformat'

export default {
  data () {
    return {
      client: {
        name: '',
        email: '',
        attendedDropins: []
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
      const attendedDropins = (await ClientService.dropins(this.$route.params.clientId)).data
      if (response.error) {
        this.error = response.error
      } else {
        this.client = response
        for (var i = 0; i < attendedDropins.length; i++) {
          attendedDropins[i].date = this.dateParse(attendedDropins[i].date)
        }
        this.client.attendedDropins = attendedDropins
      }
    },
    clear: function () {
      this.client.name = ''
      this.client.email = ''
      this.error = ''
    },
    dateParse (date) {
      var newDate = new Date(date)
      newDate = dateformat(newDate, 'dddd, dS mmmm, yyyy')
      return newDate
    }
  }
}

</script>

<style scoped>

</style>
