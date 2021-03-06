<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Edit an existing counselling session</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
           <v-card>
            <v-btn absolute top right fab @click="checkDelete = true"><v-icon>delete</v-icon></v-btn>
             <v-dialog v-model="checkDelete" max-width="290">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this counselling session?</v-card-title>
                <v-card-text>{{session.date}}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey darken-1" flat="flat" @click.native="checkDelete = false">Cancel</v-btn>
                  <v-btn color="red darken-1" flat="flat" @click.native="deleteThis()">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
          <v-flex xs11 sm5>
            <v-menu
              ref="menu"
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="session.date"
              required
            >
              <v-text-field
                slot="activator"
                label="Date"
                v-model="session.date"
                prepend-icon="event"
                readonly
                required
              ></v-text-field>
              <v-date-picker v-model="session.date" no-title scrollable :allowed-dates="allowedDates" @change="$refs.menu.save(session.date)" required>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-select
                  :items="allClientsNames"
                  v-model="addedClient"
                  label="add client"
                  autocomplete
                  @keyup.enter.native="addClient(addedClient)"
                ></v-select>
                <v-btn @click="addClient(addedClient)">add</v-btn>
              </v-flex>
              <v-flex xs12 sm6>
                <v-subheader>attendees</v-subheader>
                <v-chip close v-for="client in clients" :key="client.id" @input="removeClient(client)">
                  {{client.name}}
                </v-chip>
              </v-flex>
            </v-layout>
          </v-container>
          <div class="error" v-html="error" />
          <v-btn @click="submit">Save</v-btn>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import CounsellingService from '@/services/CounsellingService'
import ClientService from '@/services/ClientService'
import dateformat from 'dateformat'

export default {
  data () {
    return {
      session: {
        date: '',
        attendees: []
      },
      allClients: [],
      allClientsNames: [],
      clients: [],
      addedClient: '',
      menu: false,
      modal: false,
      error: null,
      checkDelete: false
    }
  },
  methods: {
    async save () {
      this.session.attendees = []
      for (var i = 0; i < this.clients.length; i++) {
        this.session.attendees.push(this.clients[i].id)
      }
      try {
        await CounsellingService.put(this.session)
        this.$router.push({
          name: 'counselling-session',
          params: {
            sessionId: this.$route.params.sessionId
          }
        })
        const snackfunc = this.$parent.$parent.$parent.snack
        snackfunc('counselling session updated')
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async load () {
      const response = (await CounsellingService.show(this.$route.params.sessionId)).data
      if (response.error) {
        this.error = response.error
      } else {
        response.date = this.dateParse(response.date)
        this.session = response
        for (var i = 0; i < this.session.attendees.length; i++) {
          const client = (await ClientService.show(this.session.attendees[i])).data
          this.clients.push(client)
        }
      }
    },
    dateParse (date) {
      var newDate = new Date(date)
      newDate = dateformat(newDate, 'yyyy-mm-dd')
      return newDate
    },
    addClient (clientName) {
      const client = {
        id: this.clientNameToId(clientName),
        name: clientName
      }
      if (!this.inClientList(client) && clientName !== '') {
        this.clients.push(client)
      }
    },
    removeClient (client) {
      var index = this.clients.indexOf(client)
      if (index > -1) {
        this.clients.splice(index, 1)
      }
    },
    clientNameToId (name) {
      for (var i = 0; i < this.allClients.length; i++) {
        if (this.allClients[i].name === name) {
          return this.allClients[i].id
        }
      }
    },
    inClientList (client) {
      for (var i = 0; i < this.clients.length; i++) {
        if (client.name === this.clients[i].name && client.id === this.clients[i].id) {
          return true
        }
      }
      return false
    },
    allowedDates: val => (new Date() >= new Date(val)),
    async deleteThis () {
      const response = (await CounsellingService.delete(this.$route.params.sessionId)).data
      this.checkDelete = false
      if (response.error) {
        this.error = response.error
      } else {
        const snackfunc = this.$parent.$parent.$parent.snack
        snackfunc(`session ${this.session.date} deleted`)
        this.$router.push({
          name: 'counselling-sessions'
        })
      }
    },
    submit () {
      this.error = ''
      if (this.session.date !== '' && this.clients.length > 0) {
        this.save()
      } else {
        this.error = 'Session must have date and at least one attendee'
      }
    }
  },
  async mounted () {
    this.allClients = (await ClientService.index()).data
    for (var i = 0; i < this.allClients.length; i++) {
      this.allClientsNames.push(this.allClients[i].name)
    }
    this.load()
  }
}

</script>

<style scoped>

</style>
