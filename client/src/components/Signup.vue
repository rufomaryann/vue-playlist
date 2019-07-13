<template>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person"  v-model="email" name="email" label="Email" type="text"></v-text-field>
              <v-text-field id="password" prepend-icon="lock" v-model="password" name="password" label="Password" type="password"></v-text-field>
              <v-alert :value="validationerror" color="error" v-html="error"></v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  import AuthService from '@/services/AuthService'

  export default {
    data: () => ({
      drawer: null,
    }),
    props: {
      source: String
    },
    data() {
      return {
        email: '',
        password: '',
        error: null,
        validationerror: false
      }
    },
    methods: {
      async register(){
        try {
          const response = await AuthService.register({
            email: this.email,
            password: this.password
          })
          this.validationerror = false
          
          console.log(response.data)
        } catch (error) {
          this.error = error.response.data.error
          this.validationerror = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
