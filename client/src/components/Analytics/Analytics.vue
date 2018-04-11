<template>
  <div>
    <v-layout row wrap>
      <v-container fluid grid-list-md>
        <h1>Analytics</h1><br />
        <v-flex xs8 offset-xs2 class="text-xs-center">
          <v-card  class="text-xs-center">
              <div>Graph here</div>
          </v-card>
        </v-flex>
      </v-container>
    </v-layout>

  </div>
</template>

<script>
import DropinService from '@/services/DropinService'
import CounsellingService from '@/services/CounsellingService'
import ClientService from '@/services/ClientService'
import InteractionService from '@/services/InteractionService'
import dateformat from 'dateformat'

export default {
  data () {
    return {
     
    }
  },
  methods: {
    dateParse (date) {
      var newDate = new Date(date)
      newDate = dateformat(newDate, 'dddd, dS mmmm, yyyy')
      return newDate
    },
    
  },
  async mounted () {
    
  }
}

</script>

<style scoped>
.no-decoration {
  text-decoration: none
}
</style>
