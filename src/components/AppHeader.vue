<template>
  <v-app-bar app color="#f0f0f0" elevation="0" class="mx-auto my-2" style="max-width: 1761px">
    <a href="/" class="hidden-md-and-up" style="text-decoration: none">
      <img class="ml-4" width="36px" src="../assets/logo.png" alt="Home Works Logo" />
    </a>
    <div class="d-flex align-center mx-auto">
      <a href="/" class="hidden-sm-and-down" style="text-decoration: none">
        <img width="250px" class="mt-1" src="../assets/homeworks-logo-text-bg.png" alt="Home Works Logo" />
      </a>
      <a href="/" class="hidden-sm-and-down" style="text-decoration: none">
        <img class="ml-4" width="36px" src="../assets/logo.png" alt="Home Works Logo" />
      </a>
    </div>
    <v-spacer v-if="accessToken"></v-spacer>

   

    <span class="mr-2" v-if="accessToken" href="#" text>
      {{ $t("hi") }} {{ userName }}
    </span>

    <v-menu v-if="accessToken" rounded offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/new-password">
          {{ $t("change_password") }}</v-list-item>
        <v-list-item @click="userLogout()"> {{ $t("logout") }}</v-list-item>
      </v-list>
    </v-menu>
    <select style="
        background: #6557f5;
        padding: 4px;
        border-radius: 5px;
        border: none;
        color: white;
        cursor: pointer;
      " v-model="lang" @change="switchSelect($event)">
      <option value="pt">PT</option>
      <option value="en" selected>EN</option>
      <option value="es">ES</option>
    </select> 
    <v-snackbar color="green" v-model="snackbar">
      {{ msg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" href="/" loading text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app-bar>
</template>


<script>
import axios from "axios";
const URL_LOGOUT = "https://homeworks-api.vercel.app/account/logout";
const lang = localStorage.getItem("lang") || "en";

export default {
  name: "AppFooter",
  data: () => ({
    snackbar: null,
    lang: lang,
    msg: null,
    language: window.navigator.language,
    links: [
      {
        name: "sair",
        path: "/sair",
      },
      {
        name: "config",
        path: "/config",
      },
      {
        name: "home",
        path: "/",
      },
    ],
    userName: sessionStorage.getItem("userName"),
    accessToken: sessionStorage.getItem("accessToken"),
  }),
  methods: {
    userLogout() {
      axios
        .post(URL_LOGOUT, {})
        .then((response) => {
          this.snackbar = true;
          console.log(response);
          sessionStorage.clear();
          this.msg = response.data.message;
        })
        .catch((error) => {
          console.log("ERRO", error);
          this.msg = error.response.data.error.message.description;
        })
        .finally(() => {
          setTimeout(() => {
            this.$router.push(
              { name: "home" },
              window.location.reload(),
              (this.loading = false)
            );
            //this.msg = false;
            this.snackbar = false;
          }, 3000);
        });
    },

    switchSelect(event) {
      localStorage.setItem("lang", event.target.value);
      console.log("idioma selecionado: ", localStorage.getItem("lang"));
      window.location.reload();
    },
  },
};
</script>
