<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Interaction</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
            <v-card>
              <router-link :to="{ name: 'interaction-edit', params: { interactionId: this.$route.params.interactionId }}">
                <v-btn absolute top right fab><v-icon>edit</v-icon></v-btn>
              </router-link>
            </v-card>
          <div class="error">{{error}}</div>
          <v-subheader>Date</v-subheader>
          <h1>{{session.date}}</h1>
          <v-subheader>Notes</v-subheader>
          <p>{{session.notes}}</p>
          <v-subheader>attendees</v-subheader>
          <v-data-table hide-headers hide-actions :items=session.attendeeObjs>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import InteractionService from '@/services/InteractionService'
import ClientService from '@/services/ClientService'
import dateformat from 'dateformat'

export default {
  data () {
    return {
      session: {
        date: '',
        attendees: [],
        attendeeObjs: [],
        notes: ''
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
    dateParse (date) {
      var newDate = new Date(date)
      newDate = dateformat(newDate, 'dddd, dS mmmm, yyyy')
      return newDate
    },
    load: async function () {
      const data = (await InteractionService.show(this.$route.params.interactionId)).data
      if (data.error) {
        this.error = data.error
      } else {
        data.date = this.dateParse(data.date)
        data.attendeeObjs = []
        for (var i = 0; i < data.attendees.length; i++) {
          const client = (await ClientService.show(data.attendees[i])).data
          data.attendeeObjs.push(client)
        }
        this.session = data
      }
    },
    clear: function () {
      this.session.date = ''
      this.session.attendees = ''
      this.error = ''
    }
  }
}

</script>

<style scoped>

</style>
