<template>
    <v-app-bar v-if="accessToken" app color="primary" dark>
        <div class="d-flex align-center">
            <v-img alt="Vuetify Logo" class="shrink mr-2"
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition"
                width="40" />
        </div>
        <v-spacer></v-spacer>
        <v-btn class="mr-2" href="/" text> Home </v-btn>
        <v-btn class="mr-2" v-if="accessToken" href="/reset-password" text> Resetar Senha </v-btn>
        <v-btn class="mr-2" v-if="accessToken" href="/new-password" text> Nova Senha </v-btn>
        <v-btn class="mr-2 primary--text" v-if="!accessToken" href="/register" color="white"> Cadastro </v-btn>
        <v-btn class="mr-2" v-if="!accessToken" href="/login" outlined> Login </v-btn>
        <v-btn class="mr-2" v-if="accessToken" href="/#" outlined> Sair </v-btn>
    </v-app-bar>

</template>


<script>
  export default {
    name: 'AppFooter',
    data: () => ({
      accessToken: sessionStorage.getItem("accessToken"),
    }),
   }
</script>
