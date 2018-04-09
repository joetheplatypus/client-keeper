<template>
  <div id="app">
    <v-app>
      <v-toolbar flat dark class="orange">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Client Keeper</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat :to="{ name: 'clients' }">Clients</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
          <v-snackbar top :timeout="4000" v-model="snackbar">
            {{snackcontent}}
            <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      snackbar: false,
      snackcontent: ''
    }
  },
  methods: {
    snack (str) {
      this.snackcontent = str
      this.snackbar = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
