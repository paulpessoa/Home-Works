<template>
  <div>
    <v-card outlined class="mx-auto mt-10 px-8 py-2" max-width="460">
      <v-card-title class="justify-center mb-2">Crie sua conta</v-card-title>

      <v-form ref="form" @submit.prevent="createUser">
        <v-text-field v-model="firstName" :rules="nameRules" filled type="text" label="Nome" required persistent-hint
          outlined>
        </v-text-field>
        <v-text-field v-model="lastName" filled type="text" label="Sobrenome" required persistent-hint outlined>
        </v-text-field>
        <v-text-field v-model="email" :rules="emailRules" filled type="mail" label="E-mail" required persistent-hint
          outlined>
        </v-text-field>

        <v-text-field v-model="password" filled :append-icon="showKey1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showKey1 ? 'text' : 'password'" label="Senha" required outlined :rules="passwordRules"
          @click:append="showKey1 = !showKey1"></v-text-field>
        <v-text-field v-if="none" v-model="confirmPassword" filled :append-icon="showKey2 ? 'mdi-eye' : 'mdi-eye-off'"
          :disabled="!password" :type="showKey2 ? 'text' : 'password'" label="Confirm Password" required outlined
          counter :rules="[passwordConfirmationRule]" @click:append="showKey2 = !showKey2"></v-text-field>

        <v-btn block x-large type="submit" class="white--text" color="#012A4A" depressed :loading="isLoading"
          :disabled="!firstName || !password || !email">Cadastrar</v-btn>
      </v-form>

      <v-alert class="mt-7" v-if="emailConfirm" dismissible type="success">
        {{ emailConfirm }}
      </v-alert>

      <v-card-actions class="text-xs-center py-4">
        <v-btn x-large color="orange lighten-2" text href="/reset-password">
          Recuperar senha
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn  x-large color="orange lighten-2" text href="/login">
          login
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
const url = "https://homeworks-api.vercel.app/account/register";

export default {
  name: "FormRegister",
  data: () => ({
    isLoading: false,
    showKey1: false,
    showKey2: false,

    firstName: null,
    lastName: null,
    email: null,
    password: "",
    confirmPassword: null,
    nameRules: [(v) => !!v || "Preencha este campo"],
    emailRules: [(v) => /.+@.+\..+/.test(v) || "Informe um e-mail válido"],
    passwordRules: [(v) => !!v || "Informe uma senha"],
    confirmPasswordRules: [(v) => !!v || "Digite igual ao campo anterior"],
    emailConfirm: null,
  }),
  methods: {
    createUser() {
      this.isLoading = true
      axios
        .post(url, {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("DEU CERTO", response.data.message.user.email, response);
          var sessionMail = response.data.message.user.email

          function userEmail() {
            sessionStorage.setItem("userEmail", sessionMail);
          }
          userEmail()
          this.emailConfirm = response.data.message.description;
          setTimeout(() => {
            this.emailConfirm = false;
          }, 3500);




          var mailconfirmation = setInterval(() => {
            this.$router.push({
              name: "email-confirmation",
              email: sessionStorage.getItem("userEmail")
            });
            clearInterval(mailconfirmation);
          }, 3000);
          //alert(response.data.message.description)
          // window.location.href = '/login';
          this.response = JSON.stringify(response, null, 2);
        })
        .catch((error) => {
          this.response = "Error: " + error.response.status;
          console.log("DEU ERRADO", response);
        });
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword
          ? ""
          : "Os senhas estão divergentes";
    },
  },
};
</script>
