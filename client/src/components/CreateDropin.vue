<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Create a new Drop In</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
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
              <v-date-picker v-model="dropin.date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(dropin.date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-text-field label="attendees" required  v-model="dropin.attendees"></v-text-field>
          <div class="error" v-html="error" />
          <v-btn @click="create">Create</v-btn>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import DropinService from '@/services/DropinService'

export default {
  data () {
    return {
      dropin: {
        date: '',
        attendees: ''
      },
      menu: false,
      modal: false,
      error: null
    }
  },
  methods: {
    async create () {
      console.log(this.dropin.date)
      try {
        await DropinService.post({
          date: this.dropin.date,
          attendees: this.dropin.attendees
        })
        const snackfunc = this.$parent.$parent.$parent.snack
        snackfunc('Dropin has been created')
        this.$router.push({name: 'dropins'})
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}

</script>

<style scoped>

</style>
