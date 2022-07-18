<template>
  <div>
    <v-card outlined class="mx-auto mt-10 px-8 py-2" max-width="460">
      <v-card-title class="justify-center mb-2">Reset Password</v-card-title>
      <v-form ref="form" @submit.prevent="resetPassword">
        <v-text-field v-model="email" filled type="mail" label="E-mail" required persistent-hint outlined>
        </v-text-field>
        
        <v-btn block x-large type="submit" :loading="isLoading" color="primary" depressed class="justify-center">Recuperar</v-btn>
      </v-form>
      
      <v-alert class="mt-7" v-if="emailConfirm" dismissible  type="success">
          {{ emailConfirm }}
      </v-alert>

      <v-card-actions class="text-xs-center py-4">
        <v-btn x-large color="orange lighten-2" text to="/register"> Registrar </v-btn>
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
    email: null,
    emailConfirm: null

  }),
   methods: {
    resetPassword() {
      axios.post(url, {
        email: this.email,
        password: this.password,
      }).then(response => {
        this.isLoading = true
        console.log("DEU CERTO", response);
          this.emailConfirm = "Link de recuperação enviado por e-mail"
        setTimeout(() => {
          this.emailConfirm = false
        }, 5000);

          clearInterval(setTimeout)
        this.$router.push({ name: 'login' });

        this.response = JSON.stringify(response, null, 2)
      }).catch(error => {
        this.response = 'Error: ' + error.response.status
        console.log("DEU ERRADO", response); 
      })
    },
  },
}
</script>
