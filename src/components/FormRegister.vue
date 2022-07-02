<template>
  <div>
    <v-card outlined class="mx-auto mt-10 px-8 py-2" max-width="460">

      <v-card-title class="justify-center mb-2">Crie sua conta</v-card-title>

      <v-form ref="form" @submit.prevent="createUser">

        <v-text-field v-model="firstName" filled type="text" label="First Name" required persistent-hint outlined></v-text-field>
        <v-text-field v-model="lastName" filled type="text" label="Last Name" required persistent-hint outlined></v-text-field>
        <v-text-field v-model="email" filled type="mail" label="E-mail" required persistent-hint outlined></v-text-field>

        <v-text-field v-model="password" filled :append-icon="showKey1 ? 'mdi-eye' : 'mdi-eye-off'" :type="showKey1 ? 'text' : 'password'" label="Password" required outlined @click:append="showKey1 = !showKey1"></v-text-field>
        <v-btn block x-large type="submit" color="primary" depressed>Register</v-btn>
      </v-form>
      
      <v-alert class="mt-7" v-if="emailConfirm" dismissible  type="success">
          {{ emailConfirm }}
      </v-alert>

      <v-card-actions class="text-xs-center py-4">
        <v-btn block x-large color="orange lighten-2" text href="/login"> login </v-btn>
      </v-card-actions>

    </v-card>

  </div>
</template>

<script lang="ts">
import axios from "axios";
const url = "https://homeworks-api.vercel.app/account/register";

export default {
  name: "FormRegister",
  data: () => ({
    showKey1: false,
    showKey2: false,
    
    firstName: null,
    lastName: null,
    email: null,
    password: null,

    emailConfirm: null
    
  }),
  methods: {
    createUser() {
      axios.post(url, {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      }).then(response => {
        console.log("DEU CERTO", response);
          this.emailConfirm = "Verifique o seu e-mail"
        setTimeout(() => {
          this.emailConfirm = false
        }, 60000);

        
        //this.$router.push({ name: 'login' });
        //alert(response.data.message.description)
        // window.location.href = '/login';
        // this.response = response.data 
        // this.success = 'Data saved successfully';
        this.response = JSON.stringify(response, null, 2)
      }).catch(error => {
        this.response = 'Error: ' + error.response.status
        console.log("DEU ERRADO", response); 
      })
    },
  },
};
</script>
