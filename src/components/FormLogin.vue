<template>
 <div class="pa-6">
    <v-card elevation="0" v-if="!accessToken" class="mx-auto px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">AUTENTICAÇÃO</v-card-title>
      <v-form @submit.prevent="userLogin">
        <v-text-field v-model="email" filled type="mail" label="E-mail" required persistent-hint outlined>
        </v-text-field>
        <v-text-field v-model="password" filled :append-icon="showKey ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showKey ? 'text' : 'password'" label="Password" required persistent-hint outlined
          @click:append="showKey = !showKey">
        </v-text-field>
        <v-btn block x-large dark type="submit" color="#012A4A" depressed class="justify-center" :loading="isLoading">Login
        </v-btn>
      </v-form>
      <v-alert class="mt-7" v-if="emailConfirm" dismissible type="success">
        {{ emailConfirm }}
      </v-alert>
      <v-card-actions class="text-xs-center py-4">
        <v-btn x-large color="orange lighten-2" text to="/reset-password"> Recuperar senha </v-btn>
        <v-spacer></v-spacer>
        <v-btn x-large color="orange lighten-2" text to="/register"> CADASTRO </v-btn>
      </v-card-actions>
    </v-card>
    <TableActivities v-else />
  </div>

</template>



<script>
import axios from "axios";
import TableActivities from "@/components/tasks/TableActivities.vue";
const url = "https://homeworks-api.vercel.app/account/login";

export default {
  name: "FormLogin",
  data: () => ({
    accessToken: sessionStorage.getItem("accessToken"),
    isLoading: false,
    showKey: false,
    password: null,
    email: sessionStorage.getItem("userEmail"),
    emailConfirm: null
  }),
  methods: {
    userLogin() {
      axios.post(url, {
        email: this.email,
        password: this.password,
      }).then(response => {
        this.isLoading = true;
        this.emailConfirm = "User authentication succeeded"
        console.log(response.config.data)
        var userToken = response.data.accessToken
        var sessionMail = this.email

        function accessToken() {
          sessionStorage.setItem("userEmail", sessionMail)
          sessionStorage.setItem("accessToken", userToken)
        }
        accessToken();
        setTimeout(() => {
          window.location.reload();
          this.emailConfirm = false;
        }, 3000);
        clearTimeout(setTimeout);
        this.response = JSON.stringify(response, null, 2);
      }).catch(error => {
        this.response = "Error: " + error;
        console.log("ERRO", error);
        this.emailConfirm = error.response.data.error.message.description;
        this.isLoading = false
      });
    },
  },
  components: { TableActivities }
}
</script>
