<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
    <a href="/">
      
      <v-img alt="Vuetify Logo" class="shrink mr-2" src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition" width="40" /> 
    </a>
    <v-btn class="mr-2 text-lg-h6" href="/" text> Home </v-btn>

    </div>
    <v-spacer></v-spacer>
    <v-btn class="mr-2" v-if="accessToken" href="#" text> Configurações </v-btn>
    <v-btn class="mr-2 primary--text" v-if="!accessToken" href="/register" color="white"> Cadastro </v-btn>
    <v-btn class="mr-2" v-if="!accessToken" href="/login" outlined> Login </v-btn>
    <v-btn class="mr-2" v-if="accessToken" href="/#" @click="logout()" outlined> Sair </v-btn>
  </v-app-bar>

</template>


<script>
import axios from "axios";
const url = "https://homeworks-api.vercel.app/account/logout";

export default {
  name: 'AppFooter',
  data: () => ({
    accessToken: sessionStorage.getItem("accessToken"),
  }),
  methods: {
    logout() {
      axios.post(url, {
      email: this.email,

    }).then(response => {
      this.isLoading = true
      console.log("DEU CERTO", response);

      function accessToken() {
        sessionStorage.setItem("accessToken", userToken);
      }
      accessToken()

      setTimeout(() => {
        this.$router.push({ name: 'home' });
      }, 3000);
      clearTimeout(setTimeout)


      this.response = JSON.stringify(response, null, 2)
    }).catch(error => {
      this.response = 'Error: ' + error.response.status
      console.log("DEU ERRADO", response);
    })
  },
}
}
</script>
