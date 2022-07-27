<template>
  <v-app-bar app color="#012A4A" dark elevation="0">
    <div class="d-flex align-center mx-auto">
      <a href="/" style="text-decoration: none; color: white">
        <h1 class="mr-2" href="/" text> Home-Works </h1>
      </a>
    </div>
    <v-spacer v-if="accessToken"></v-spacer>
    <span class="mr-2" v-if="accessToken" href="#" text> Oi {{ userName }} </span>
    <v-menu v-if="accessToken" left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/new-password"> Mudar senha </v-list-item>
        <v-list-item @click="logout()"> Sair </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

</template>


<script>
import axios from "axios";
const url = "https://homeworks-api.vercel.app/account/logout";

export default {
  name: 'AppFooter',
  data: () => ({
    links: [
      {
        name: 'sair',
        path: '/sair'
      },
      {
        name: 'config',
        path: '/config'
      },
      {
        name: 'home',
        path: '/home'
      },
    ],
    userName: sessionStorage.getItem("userName"),
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
