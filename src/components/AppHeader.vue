<template>
  <v-app-bar app color="#012A4A" dark>
    <div class="d-flex align-center">
    <a href="/">
    </a>
    <v-btn class="mr-2 text-lg-h6" href="/" text> HomeWORKS </v-btn>

    </div>
    <v-spacer></v-spacer>
    <v-btn class="mr-2" v-if="accessToken" href="#" text> Config </v-btn>
    <v-btn class="mr-2" v-if="accessToken" href="/#" @click="logout()" outlined> Sair </v-btn>
  </v-app-bar>

</template>


<script>
import axios from "axios";
const url = "https://app-homeworks.herokuapp.com/account/logout";

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
