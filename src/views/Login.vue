<template>
  <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="user.name"
                    autocomplete="off"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="user.password"
                    autocomplete="off"
                  ></v-text-field>

                  <div v-if="loginErrors && loginErrors.length" class="errors">
                    <span v-for="(error, index) in loginErrors" :key="index">{{error}}</span>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined @click="register()">Register</v-btn>
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>

export default {
  data() {
    return {
      user: {}
    }
  },

  created() {

  },

  computed: {
    loginErrors() {
      return this.$store.state.loginErrors;
    }
  },

  methods: {
    login() {
      this.$store.dispatch('LOGIN', this.user).then(result => {
        this.$router.push({ path: '/dashboard' })
      });
    },

    register() {
      if (this.user && this.user.name && this.user.password) {
        this.$store.dispatch('REGISTER', this.user).then(result => {
          this.$router.push({ path: '/dashboard' })
        });
      }
    }
  }
}
</script>

<style>
  .errors {
    color: red;
  }
</style>