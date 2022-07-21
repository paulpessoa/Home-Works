<template>
  <div class="pa-6">
    <v-card elevation="0" class="mx-auto px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">RECUPERAÇÃO DE CONTA</v-card-title>
      <v-form ref="form" @submit.prevent="resetPassword">
        <v-text-field v-model="email" filled type="mail" label="E-mail" required persistent-hint outlined>
        </v-text-field>
        
        <v-btn block x-large type="submit" :loading="isLoading" color="#012A4A" depressed class="justify-center white--text">RESETAR SENHA</v-btn>
      </v-form>
      
      <v-alert class="mt-7" v-if="emailConfirm" dismissible  type="success">
          {{ emailConfirm }}
      </v-alert>

      <v-card-actions class="text-xs-center py-4">
        <v-btn x-large color="orange lighten-2" text to="/register"> CADASTRO </v-btn>
      <v-spacer></v-spacer>
        <v-btn x-large color="orange lighten-2" text href="/login"> login </v-btn>
      
      </v-card-actions> 
    </v-card>
  </div>

</template>

<script>
import axios from "axios";
const url = "https://homeworks-api.vercel.app/account/reset/password";

export default {
  name: 'ResetPassword',
  data: () => ({
    isLoading: false,
    email: sessionStorage.getItem("userEmail"),
    emailConfirm: null

  }),
   methods: {
    resetPassword() {
      axios.post(url, {
        email: this.email,
        password: this.password,
      }).then(response => {
        this.isLoading = true
        this.emailConfirm = response.data.message.description
        console.log("DEU CERTO", response);
        setTimeout(() => {
          console.log('set1')
          this.emailConfirm = false
          this.$router.push({
              name: "login",
            });
        }, 3000);
        


        this.response = JSON.stringify(response, null, 2)
      }).catch(error => {
        this.response = 'Error: ' + error
        console.log("DEU ERRADO", error.response.data.error.message.description)
        this.emailConfirm = error.response.data.error.message.description
        this.isLoading = false
      })
    },
  },
}
</script>
