<template>
  <div>
    <v-card v-if="!accesToken" outlined class="mx-auto mt-10 px-8 py-2" max-width="460">
      <v-card-title class="justify-center mb-2">Login</v-card-title>
      <v-form @submit.prevent="userLogin">
        <v-text-field v-model="email" filled type="mail" label="E-mail" required persistent-hint outlined>
        </v-text-field>
        <v-text-field v-model="password" filled :append-icon="showKey ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showKey ? 'text' : 'password'" label="Password" required persistent-hint outlined
          @click:append="showKey = !showKey">
        </v-text-field>
        <v-btn block x-large type="submit" color="primary" depressed class="justify-center" :loading="isLoading">Login
        </v-btn>
      </v-form>
      <v-alert class="mt-7" v-if="emailConfirm" dismissible type="success">
        {{ emailConfirm }}
      </v-alert>
      <v-card-actions class="text-xs-center py-4">
        <v-btn x-large color="orange lighten-2" text to="/reset-password"> Recuperar senha </v-btn>
        <v-spacer></v-spacer>
        <v-btn x-large color="orange lighten-2" text to="/register"> Registrar </v-btn>
      </v-card-actions>
    </v-card>
    <v-div v-else-if="accessToken = {redirect: { name: '#' }}"></v-div>
  </div>

</template>



<script>
import axios from "axios";
const url = "https://homeworks-api.vercel.app/account/login";

export default {
  name: 'FormLogin',
  data: () => ({
    isLoading: false,
    showKey: false,
    password: null,
    email: sessionStorage.getItem("userEmail"),
    emailConfirm: null

  }),
  methods: {
    userLogin() {
      this.isLoading = true
      axios.post(url, {
        email: this.email,
        password: this.password,
      }).then(response => {
        this.emailConfirm = 'Escrever algo aqui...'
        console.log("DEU CERTO", response);
        var userToken = response.data.accessToken

        function accessToken() {
          sessionStorage.setItem("accessToken", userToken);
        }
        accessToken()

        setTimeout(() => {
          this.emailConfirm = false
          this.$router.push({ name: 'home' });
        }, 5000);
        clearTimeout(setTimeout)


        this.response = JSON.stringify(response, null, 2)
      }).catch(error => {
        this.response = 'Error: ' + error.response
        console.log("DEU ERRADO", response);
      })
    },
  },
}
</script>
