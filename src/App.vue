<template>
  <v-app>
     <v-app-bar v-show="userKey" app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />        
      </div>
      <v-spacer></v-spacer>

      <v-btn class="mr-2" href="/login" text> Login </v-btn>
      <v-btn class="mr-2" href="/register" text> Cadastro </v-btn>
      <v-btn class="mr-2" href="/email-confirmation" text> Verificar Email </v-btn>
      <v-btn class="mr-2" href="/reset-password" text> Resetar Senha </v-btn>
      <v-btn class="mr-2" href="/new-password" text> Nova Senha </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import FormLogin from "./components/FormLogin.vue";

export default Vue.extend({
    name: "App",
    data: () => ({
    //
    userKey: true,
    }),
    components: { FormLogin }
});
</script>
