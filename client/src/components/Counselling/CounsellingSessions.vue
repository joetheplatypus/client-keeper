<template>
  <div>
    <v-layout row wrap>
      <v-container fluid grid-list-md>
        <h1>All Counselling Sessions</h1><br />
        <v-flex xs8 offset-xs2>
          <v-card>
            <router-link :to="{ name: 'counselling-session-create' }">
              <v-btn fixed bottom right fab><v-icon>add</v-icon></v-btn>
            </router-link>
          </v-card>
          <v-layout row wrap>
            <v-flex xs4 v-for="session in sessions" :key="session.id">
              <v-card>
                <v-card-title primary-title class="justify-center"><h3 class="headline mb-0">{{session.date}}</h3></v-card-title>
                <v-card-text>{{session.attendees.length}} attendees</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <router-link class="no-decoration" :to="{ name: 'counselling-session', params: { sessionId: session.id }}">
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
import CounsellingService from '@/services/CounsellingService'
import dateformat from 'dateformat'

export default {
  data () {
    return {
      sessions: null,
      search: ''
    }
  },
  watch: {
    search (value) {
      const route = {
        name: 'counselling-sessions'
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
        this.sessions = (await CounsellingService.index(value)).data
      }
    }
  },
  methods: {
    dateParse (date) {
      var newDate = new Date(date)
      newDate = dateformat(newDate, 'dddd, dS mmmm, yyyy')
      return newDate
    }
  },
  async mounted () {
    const data = (await CounsellingService.index()).data
    for (var i = 0; i < data.length; i++) {
      data[i].date = this.dateParse(data[i].date)
    }
    this.sessions = data
  }
}

</script>

<style scoped>
.no-decoration {
  text-decoration: none
}
</style>
