<template>
  <v-app-bar app color="#012A4A" dark>
    <div class="d-flex align-center">
    <a href="/" style="text-decoration: none; color: white">
    <h1 class="mr-2" href="/" text> Home-Works </h1>
    </a>

    </div>
    <v-spacer></v-spacer>
    <span class="mr-2" v-if="accessToken" href="#" text> Olá {{userName}}! </span>
    <v-btn class="mr-2" v-if="accessToken" href="#" text> menu </v-btn>
    <v-btn class="mr-2" v-if="accessToken" href="/#" @click="logout()" text> Sair </v-btn>
  </v-app-bar>

</template>


<script>
import axios from "axios";
const url = "https://homeworks-api.vercel.app/account/logout";

export default {
  name: 'AppFooter',
  data: () => ({
    userName:  sessionStorage.getItem("userName"),
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
