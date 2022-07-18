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
    <v-btn class="mr-2" v-if="accessToken" href="/new-password" text> Nova senha </v-btn>
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
          sessionStorage.clear();
          window.location.reload();
        }
        
  },
}
</script>
