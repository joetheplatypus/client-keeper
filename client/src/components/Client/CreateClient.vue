<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Create a new client</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-form ref="form">
            <v-text-field label="Name" required  v-model="client.name" :rules="nameRules" @keyup.enter.native="submit"></v-text-field>
            <v-text-field label="Email" required  v-model="client.email" :rules="emailRules" @keyup.enter.native="submit"></v-text-field>
            <div class="error" v-html="error" />
            <v-btn @click="submit">Create</v-btn>
          </v-form>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import ClientService from '@/services/ClientService'

export default {
  data () {
    return {
      client: {
        name: '',
        email: ''
      },
      error: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ]
    }
  },
  methods: {
    async create () {
      try {
        await ClientService.post({
          name: this.client.name,
          email: this.client.email
        })
        const snackfunc = this.$parent.$parent.$parent.snack
        snackfunc('User ' + this.client.name + ' has been created')
        this.$router.push({name: 'clients'})
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.create()
      }
    }
  }
}

</script>

<style scoped>

</style>
