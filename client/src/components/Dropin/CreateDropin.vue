<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Create a new Drop In</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
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
                required
              >
                <v-text-field
                  slot="activator"
                  label="Date"
                  v-model="dropin.date"
                  prepend-icon="event"
                  readonly
                  required
                ></v-text-field>
                <v-date-picker v-model="dropin.date" no-title scrollable :allowed-dates="allowedDates" @change="$refs.menu.save(dropin.date)" required>
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
                  @keyup.enter.native="addClient(addedClient)"
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
          <v-btn @click="submit">Create</v-btn>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import DropinService from '@/services/DropinService'
import ClientService from '@/services/ClientService'

export default {
  data () {
    return {
      dropin: {
        date: '',
        attendees: [],
        choir: false
      },
      allClients: [],
      allClientsNames: [],
      clients: [],
      addedClient: '',
      menu: false,
      modal: false,
      error: null
    }
  },
  methods: {
    async create () {
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
        await DropinService.post({
          date: this.dropin.date,
          attendees: this.dropin.attendees,
          choir: this.dropin.choir
        })
        const snackfunc = this.$parent.$parent.$parent.snack
        snackfunc('Dropin has been created')
        this.$router.push({name: 'dropins'})
      } catch (err) {
        this.dropin.date = this.dropin.date.substr(0, 10)
        this.error = err.response.data.error
      }
    },
    addClient (clientName) {
      const client = {
        id: this.clientNameToId(clientName),
        name: clientName
      }
      if (!this.inClientList(client) && clientName !== '') {
        this.clients.push(client)
      }
      this.addedClient = ''
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
    submit () {
      this.error = ''
      if (this.dropin.date !== '') {
        this.create()
      } else {
        this.error = 'dropin must have a date'
      }
    }
  },
  async mounted () {
    this.allClients = (await ClientService.index()).data
    for (var i = 0; i < this.allClients.length; i++) {
      this.allClientsNames.push(this.allClients[i].name)
    }
  }
}

</script>

<style scoped>

</style>
