<template>
  <v-app>
    <AppHeader/>
    <v-main style="background: #f0f0f0">
      <router-view />
    </v-main>
    <AppFooter/>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";


export default Vue.extend({
    name: "App",
    data: () => ({
    //
    accessToken: null,
    }),
    components: { 
      AppHeader,
      AppFooter
    }
});
</script>
