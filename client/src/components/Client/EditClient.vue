<template>
  <div>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Edit an existing client</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-card>
            <v-btn absolute top right fab @click="checkDelete = true"><v-icon>delete</v-icon></v-btn>
             <v-dialog v-model="checkDelete" max-width="290">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this client?</v-card-title>
                <v-card-text>{{client.name}}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey darken-1" flat="flat" @click.native="checkDelete = false">Cancel</v-btn>
                  <v-btn color="red darken-1" flat="flat" @click.native="deleteThis()">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
          <v-text-field label="Name" required  v-model="client.name"></v-text-field>
          <v-text-field label="Email" required  v-model="client.email"></v-text-field>
          <div class="error" v-html="error" />
          <v-btn @click="save">Save</v-btn>
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
      checkDelete: false
    }
  },
  methods: {
    async save () {
      try {
        await ClientService.put(this.client)
        this.$router.push({
          name: 'client',
          params: {
            clientId: this.$route.params.clientId
          }
        })
        const snackfunc = this.$parent.$parent.$parent.snack
        snackfunc(`User ${this.client.name} updated`)
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async load () {
      const response = (await ClientService.show(this.$route.params.clientId)).data
      if (response.error) {
        this.error = response.error
      } else {
        this.client = response
      }
    },
    async deleteThis () {
      const response = (await ClientService.delete(this.$route.params.clientId)).data
      this.checkDelete = false
      if (response.error) {
        this.error = response.error
      } else {
        const snackfunc = this.$parent.$parent.$parent.snack
        snackfunc(`User ${this.client.name} deleted`)
        this.$router.push({
          name: 'clients'
        })
      }
    }
  },
  async mounted () {
    this.load()
  }
}

</script>

<style scoped>

</style>
