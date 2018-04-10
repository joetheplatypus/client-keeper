<template>
  <div>
    <v-layout row wrap>
      <v-container fluid grid-list-md>
        <h1>All Dropins</h1><br />
        <v-flex xs8 offset-xs2>
          <v-layout row wrap>
            <v-flex xs3 v-for="day in days" :key="day">
              <v-checkbox v-bind:label="`${day}`" v-model="selectedDays" v-bind:value="`${day}`" @change="filter"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-card>
            <router-link :to="{ name: 'dropins-create' }">
              <v-btn fixed bottom right fab><v-icon>add</v-icon></v-btn>
            </router-link>
          </v-card>
          <v-layout row wrap>
            <v-flex xs4 v-for="dropin in filteredDropins" :key="dropin.id">
              <v-card>
                <v-card-title primary-title class="justify-center"><h3 class="headline mb-0">{{dropin.date}}</h3></v-card-title>
                <v-card-text>{{dropin.attendees.length}} attendees</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <router-link class="no-decoration" :to="{ name: 'dropin', params: { dropinId: dropin.id }}">
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
import DropinService from '@/services/DropinService'
import dateformat from 'dateformat'

export default {
  data () {
    return {
      filteredDropins: [],
      dropins: null,
      search: '',
      days: [
        'Tuesday',
        'Thursday',
        'Friday',
        'Sunday'
      ],
      selectedDays: []
    }
  },
  watch: {
    search (value) {
      const route = {
        name: 'dropins'
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
        this.clients = (await DropinService.index(value)).data
      }
    }
  },
  methods: {
    dateParse (date) {
      var newDate = new Date(date)
      newDate = dateformat(newDate, 'dddd, dS mmmm, yyyy')
      return newDate
    },
    filter () {
      this.filteredDropins = []
      for (var i = 0; i < this.dropins.length; i++) {
        for (var j = 0; j < this.selectedDays.length; j++) {
          const date = new Date(this.dropins[i].rawDate)
          const day = dateformat(date, 'dddd')
          if (day === this.selectedDays[j]) {
            this.filteredDropins.push(this.dropins[i])
          }
        }
      }
    }
  },
  async mounted () {
    const data = (await DropinService.index()).data
    for (var i = 0; i < data.length; i++) {
      data[i].rawDate = data[i].date
      data[i].date = this.dateParse(data[i].date)
    }
    this.dropins = data
    this.selectedDays = this.days
    this.filter()
  }
}

</script>

<style scoped>
.no-decoration {
  text-decoration: none
}
</style>
