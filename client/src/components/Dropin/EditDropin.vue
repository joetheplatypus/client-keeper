<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Edit an existing dropin</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-card>
            <v-btn absolute top right fab @click="checkDelete = true"><v-icon>delete</v-icon></v-btn>
             <v-dialog v-model="checkDelete" max-width="290">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this dropin?</v-card-title>
                <v-card-text>{{dropin.date}}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey darken-1" flat="flat" @click.native="checkDelete = false">Cancel</v-btn>
                  <v-btn color="red darken-1" flat="flat" @click.native="deleteThis()">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
          <v-layout row wrap>
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
                :return-value.sync="dropin.date"
              >
                <v-text-field
                  slot="activator"
                  label="Date"
                  v-model="dropin.date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="dropin.date" no-title scrollable :allowed-dates="allowedDates">
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(dropin.date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs2>
              <v-container>
                <v-checkbox v-model="dropin.choir" label="choir"></v-checkbox>
              </v-container>
            </v-flex>
          </v-layout>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-select
                  :items="allClientsNames"
                  v-model="addedClient"
                  label="add client"
                  autocomplete
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
          <v-btn @click="save">Save</v-btn>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import DropinService from '@/services/DropinService'
import ClientService from '@/services/ClientService'
import dateformat from 'dateformat'

export default {
  data () {
    return {
      dropin: {
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
      this.dropin.attendees = []
      for (var i = 0; i < this.clients.length; i++) {
        this.dropin.attendees.push(this.clients[i].id)
      }
      this.dropin.date = this.dropin.date.substr(0, 10)
      if (this.dropin.choir) {
        this.dropin.date = this.dropin.date + 'T12:00:00.000Z'
      } else {
        this.dropin.date = this.dropin.date + 'T00:00:00.000Z'
      }
      try {
        await DropinService.put(this.dropin)
        this.$router.push({
          name: 'dropin',
          params: {
            dropinId: this.$route.params.dropinId
          }
        })
        const snackfunc = this.$parent.$parent.$parent.snack
        snackfunc('dropin updated')
      } catch (err) {
        this.dropin.date = this.dropin.date.substr(0, 10)
        this.error = err.response.data.error
      }
    },
    async load () {
      const response = (await DropinService.show(this.$route.params.dropinId)).data
      if (response.error) {
        this.error = response.error
      } else {
        response.date = this.dateParse(response.date)
        this.dropin = response
        for (var i = 0; i < this.dropin.attendees.length; i++) {
          const client = (await ClientService.show(this.dropin.attendees[i])).data
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
    allowedDates: val => (new Date() >= new Date(val)) && (new Date(val).getDay() === 0 || new Date(val).getDay() === 1 || new Date(val).getDay() === 2 || new Date(val).getDay() === 4 || new Date(val).getDay() === 5),
    async deleteThis () {
      const response = (await DropinService.delete(this.$route.params.dropinId)).data
      this.checkDelete = false
      if (response.error) {
        this.error = response.error
      } else {
        const snackfunc = this.$parent.$parent.$parent.snack
        snackfunc(`dropin ${this.dropin.date} deleted`)
        this.$router.push({
          name: 'dropins'
        })
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
