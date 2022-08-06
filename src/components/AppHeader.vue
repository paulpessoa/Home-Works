<template>
  <v-app-bar app color="#f0f0f0" elevation="0" class="mx-auto my-2" style="max-width: 1761px">
    <div class="d-flex align-center mx-auto" v-if="accessToken">
      <a href="/" class="" style="text-decoration: none">
        <img class="mr-4" width="36px" src="../assets/logo.png" alt="Home Works Logo" />
      </a>
      <a href="/" class="hidden-xl-and-down" style="text-decoration: none">
        <img width="200px" class="mt-1" src="../assets/homeworks-logo-text-bg.png" alt="Home Works Logo" />
      </a>

    </div>
    <v-spacer></v-spacer>

    <v-select style="max-width: 101px" v-model="LangSelected.lang_id" hide-selected hide-details
      :items="LangList" item-text="name" item-value="id" rounded dense return-object single-line
      @change="switchSelect()"></v-select>

    <v-menu v-if="accessToken" rounded offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-if="accessToken">
          {{ $t("hi") }} {{ userName }}
        </v-list-item>

        <v-list-item to="/new-password">
          {{ $t("change_password") }}
        </v-list-item>

        <v-list-item @click="userLogout()"> {{ $t("logout") }}</v-list-item>
      </v-list>
    </v-menu>

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

const currentLangId = parseInt(localStorage.getItem("idLocale"))
export default {
  name: "AppFooter",
  data: () => ({
    id: null,
    idLang: null,
    LangSelected: { lang_id: currentLangId || 1},
    LangList: [
      { id: 1, name: 'EN', idLang: 'en' },
      { id: 2, name: 'ES', idLang: 'es' },
      { id: 3, name: 'PT', idLang: 'pt' }
    ],
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
            this.msg = false;
            this.snackbar = false;
          }, 3000);
        });
    },

    switchSelect() {
      localStorage.setItem("lang", this.LangSelected.lang_id.idLang);
      localStorage.setItem("idLocale", this.LangSelected.lang_id.id);
      console.log(this.LangSelected.lang_id.id)
      console.log(currentLangId)
      console.log("idioma selecionado: ", localStorage.getItem("lang"));
      window.location.reload();
    },
  },
};
</script>
