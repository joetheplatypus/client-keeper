<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Dropin Information</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
            <v-card>
              <router-link :to="{ name: 'dropins-edit', params: { dropinId: this.$route.params.dropinId }}">
                <v-btn absolute top right fab><v-icon>edit</v-icon></v-btn>
              </router-link>
            </v-card>
          <div class="error">{{error}}</div>
          <v-subheader>Date</v-subheader>
          <h1>{{dropin.date}}</h1>
          <v-subheader>attendees</v-subheader>
          <p>{{dropin.attendees}}</p>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import DropinService from '@/services/DropinService'
import dateformat from 'dateformat'

export default {
  data () {
    return {
      dropin: {
        date: '',
        attendees: ''
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
      const data = (await DropinService.show(this.$route.params.dropinId)).data
      if (data.error) {
        this.error = data.error
      } else {
        data.date = this.dateParse(data.date)
        this.dropin = data
      }
    },
    clear: function () {
      this.dropin.date = ''
      this.dropin.attendees = ''
      this.error = ''
    }
  }
}

</script>

<style scoped>

</style>
