<template>
  <div>
    <v-layout row wrap>
      <v-container fluid grid-list-md>
        <h1>Analytics</h1><br />
        <v-flex xs8 offset-xs2 class="text-xs-center">
          <v-card  class="text-xs-center">
            <v-layout row wrap>
              <v-flex xs2 offset-xs1>
                <v-select
                  :items="years"
                  v-model="yearPicker"
                  label="Select a year"
                  single-line
                  @input="filter(monthPicker,yearPicker)"
                ></v-select>
              </v-flex>
              <v-flex xs6 offset-xs1>
                <v-select
                  :items="months"
                  v-model="monthPicker"
                  label="Select a month"
                  single-line
                  @input="filter(monthPicker,yearPicker)"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-container>
              <h1>{{filtered.month}}</h1>
            </v-container>
            <v-container>
              <h3><i>{{filtered.dropins.sessions.length}}</i> dropins -- <i>{{filtered.counselling.sessions.length}}</i> counselling sessions -- <i>{{filtered.interactions.sessions.length}}</i> other interactions</h3>
            </v-container>
            <v-container>
              <v-layout row wrap>
                <v-flex xs4>
                  <h1 class="mb-4">Dropins</h1>
                  <p>Total Interactions: {{filtered.dropins.interactions}}</p>
                  <p>Total Beneficiaries: {{filtered.dropins.clients.length}}</p>
                  <p>Average interactions per client: {{filtered.dropins.interactionsperclient}}</p>
                </v-flex>
                <v-flex xs4>
                  <h1 class="mb-4">Counselling</h1>
                  <p>Total Interactions: {{filtered.counselling.interactions}}</p>
                  <p>Total Beneficiaries: {{filtered.counselling.clients.length}}</p>
                  <p>Average interactions per client: {{filtered.counselling.interactionsperclient}}</p>
                </v-flex>
                <v-flex xs4>
                  <h1 class="mb-4">Other Interactions</h1>
                  <p>Total Interactions: {{filtered.interactions.interactions}}</p>
                  <p>Total Beneficiaries: {{filtered.interactions.clients.length}}</p>
                  <p>Average interactions per client: {{filtered.interactions.interactionsperclient}}</p>
                </v-flex>
              </v-layout>
              <v-container>
                <h1>Totals</h1>
              </v-container>
              <v-container>
                <h2>Interactions: {{filtered.totalInteractions}}</h2>
                <h2>Beneficiaries: {{filtered.totalClients.length}}</h2>
              </v-container>
            </v-container>
          </v-card>
        </v-flex>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import DropinService from '@/services/DropinService'
import CounsellingService from '@/services/CounsellingService'
// import ClientService from '@/services/ClientService'
import InteractionService from '@/services/InteractionService'
import dateformat from 'dateformat'

export default {
  data () {
    return {
      filtered: {
        dropins: {
          sessions: [],
          interactions: 0,
          clients: [],
          interactionsperclient: 0
        },
        counselling: {
          sessions: [],
          interactions: 0,
          clients: [],
          interactionsperclient: 0
        },
        interactions: {
          sessions: [],
          interactions: 0,
          clients: [],
          interactionsperclient: 0
        },
        totalInteractions: 0,
        totalClients: 0,
        month: ''
      },
      dropins: [],
      counselling: [],
      interactions: [],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      years: [
        2018,
        2019,
        2020,
        2021,
        2022,
        2023,
        2024,
        2025,
        2026,
        2027,
        2028
      ],
      monthPicker: this.getMonth(new Date()),
      yearPicker: parseInt(this.getYear(new Date()))
    }
  },
  methods: {
    dateParse (date) {
      var newDate = new Date(date)
      newDate = dateformat(newDate, 'dddd, dS mmmm, yyyy')
      return newDate
    },
    getMonth (date) {
      var newDate = new Date(date)
      newDate = dateformat(newDate, 'mmmm')
      return newDate
    },
    getYear (date) {
      var newDate = new Date(date)
      newDate = dateformat(newDate, 'yyyy')
      return newDate
    },
    filter (month, txtyear) {
      if (!this.monthPicker || !this.yearPicker) {
        return
      }
      const year = txtyear.toString()
      this.filtered.dropins.sessions = []
      this.filtered.counselling.sessions = []
      this.filtered.interactions.sessions = []
      this.filtered.month = month

      for (var i = 0; i < this.dropins.length; i++) {
        const _month = this.getMonth(this.dropins[i].date)
        const _year = this.getYear(this.dropins[i].date)
        if (_month === month && _year === year) {
          this.filtered.dropins.sessions.push(this.dropins[i])
        }
      }

      for (var j = 0; j < this.counselling.length; j++) {
        const _month = this.getMonth(this.counselling[j].date)
        const _year = this.getYear(this.counselling[j].date)
        if (_month === month && _year === year) {
          this.filtered.counselling.sessions.push(this.counselling[j])
        }
      }

      for (var k = 0; k < this.interactions.length; k++) {
        const _month = this.getMonth(this.interactions[k].date)
        const _year = this.getYear(this.interactions[k].date)
        if (_month === month && _year === year) {
          this.filtered.interactions.sessions.push(this.interactions[k])
        }
      }

      // dropins
      const dropinInfo = this.getInteractionInfo(this.filtered.dropins.sessions)
      this.filtered.dropins.interactions = dropinInfo.interactions
      this.filtered.dropins.clients = dropinInfo.clients
      this.filtered.dropins.interactionsperclient = dropinInfo.interactionsperclient

      // counselling
      const counsellingInfo = this.getInteractionInfo(this.filtered.counselling.sessions)
      this.filtered.counselling.interactions = counsellingInfo.interactions
      this.filtered.counselling.clients = counsellingInfo.clients
      this.filtered.counselling.interactionsperclient = counsellingInfo.interactionsperclient

      // interactions
      const interactionInfo = this.getInteractionInfo(this.filtered.interactions.sessions)
      this.filtered.interactions.interactions = interactionInfo.interactions
      this.filtered.interactions.clients = interactionInfo.clients
      this.filtered.interactions.interactionsperclient = interactionInfo.interactionsperclient

      // totals
      const concatEvents = this.filtered.dropins.sessions.concat(this.filtered.counselling.sessions, this.filtered.interactions.sessions)
      const totalInfo = this.getInteractionInfo(concatEvents)
      this.filtered.totalInteractions = totalInfo.interactions
      this.filtered.totalClients = totalInfo.clients
    },
    getInteractionInfo (events) {
      let eventInteractions = 0
      let eventClients = []
      let interactionsperclient = 0
      for (var a = 0; a < events.length; a++) {
        eventInteractions += events[a].attendees.length
        for (var b = 0; b < events[a].attendees.length; b++) {
          if (eventClients.indexOf(events[a].attendees[b]) < 0) {
            eventClients.push(events[a].attendees[b])
          }
        }
      }
      if (eventClients.length === 0) {
        interactionsperclient = 0
      } else {
        interactionsperclient = eventInteractions / eventClients.length
      }
      return {
        interactions: eventInteractions,
        clients: eventClients,
        interactionsperclient: interactionsperclient
      }
    }
  },
  async mounted () {
    this.dropins = (await DropinService.index()).data
    this.counselling = (await CounsellingService.index()).data
    this.interactions = (await InteractionService.index()).data

    this.filter(this.monthPicker, this.yearPicker)
  }
}
</script>

<style scoped>
.no-decoration {
  text-decoration: none
}
</style>
