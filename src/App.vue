<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        Flavius App
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="$store.getters.isAuthenticated" text @click="logout()">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),

  methods: {
    logout() {
      this.$store.commit('USER', {});
      this.$router.push('Login');
    }
  }
};
</script>
