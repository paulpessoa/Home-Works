<template>
  <v-app-bar app color="#f0f0f0" elevation="0" class="mx-auto my-2" style="max-width: 1761px">
      <a href="/" class=" hidden-md-and-up" style="text-decoration: none;">
        <img class="ml-4" width="36px" src="../assets/logo.png" alt="Home Works Logo">
      </a>
    <div class="d-flex align-center mx-auto">
      <a href="/" class=" hidden-sm-and-down" style="text-decoration: none;">
        <img width="250px" class="mt-1"  src="../assets/homeworks-logo-text-bg.png" alt="Home Works Logo">
      </a>
      <a href="/" class=" hidden-sm-and-down" style="text-decoration: none;">
        <img class="ml-4" width="36px" src="../assets/logo.png" alt="Home Works Logo">
      </a>
    </div>
    <v-spacer v-if="accessToken"></v-spacer>
    <span class="mr-2" v-if="accessToken" href="#" text> {{$t('hi')}} {{ userName }} </span>
    
    <v-menu v-if="accessToken" rounded
      offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/new-password"> {{$t('change_password')}}</v-list-item>
        <v-list-item @click="logout()"> {{$t('logout')}}</v-list-item>
      </v-list>      
    </v-menu>
    <select style="background: #6557F5; padding: 4px; border-radius: 5px; border: none; color: white; cursor: pointer;" v-model="lang" @change="switchSelect($event)">
        <option value="pt">PT</option>
        <option value="en" selected>EN</option>
        <option value="es">ES</option>
      </select>
  </v-app-bar>

</template>


<script>
import axios from "axios";
const url = "https://homeworks-api.vercel.app/account/logout";
const lang = localStorage.getItem('lang') || 'en'

export default {
  name: 'AppFooter',
  data: () => ({
    lang: lang,
    language: window.navigator.language,
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
        path: '/'
      },
    ],
    userName: sessionStorage.getItem("userName"),
    accessToken: sessionStorage.getItem("accessToken"),
  }),
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/");
      window.location.reload();

    },
       switchSelect(event) {
            localStorage.setItem('lang', event.target.value)
            console.log("idioma selecionado: ", localStorage.getItem('lang'))
            window.location.reload()
        }
    

  },
}
</script>
