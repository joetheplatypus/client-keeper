<template>
  <div>
    <v-layout row wrap>
      <v-container fluid grid-list-md>
        <h1>All Dropins</h1><br />
        <v-flex xs8 offset-xs2>
          <v-card>
            <router-link :to="{ name: 'dropins-create' }">
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
            <v-flex xs4 v-for="dropin in dropins" :key="dropin.id">
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
      dropins: null,
      search: ''
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
    }
  },
  async mounted () {
    const data = (await DropinService.index()).data
    for (var i = 0; i < data.length; i++) {
      data[i].date = this.dateParse(data[i].date)
    }
    this.dropins = data
  }
}

</script>

<style scoped>
.no-decoration {
  text-decoration: none
}
</style>
