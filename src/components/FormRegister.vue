<template>
  <div class="pa-6">
    <v-card elevation="0" class="mx-auto px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">NOVO CADASTRO</v-card-title>

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
        <v-text-field v-if="1>2" v-model="confirmPassword" filled :append-icon="showKey2 ? 'mdi-eye' : 'mdi-eye-off'"
          :disabled="!password" :type="showKey2 ? 'text' : 'password'" label="Confirm Password" required outlined
          counter :rules="[passwordConfirmationRule]" @click:append="showKey2 = !showKey2"></v-text-field>

        <v-btn block x-large type="submit" class="white--text" color="#6557F5" depressed :loading="loading">
          :disabled="!firstName || !password || !email">Cadastrar</v-btn>
      </v-form>

      <v-alert class="mt-7" v-if="emailConfirm" dismissible type="success">
        {{ emailConfirm }}
      </v-alert>

     <v-card-actions class="row justify-center py-4">
        <v-btn class="ma-4" color="orange lighten-2" text href="/reset-password">
          Recuperar senha
        </v-btn>
        <v-btn class="ma-4" color="orange lighten-2" text href="/login">
          login
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormRegister",
  data: () => ({
    loading: null,
    showKey1: false,
    showKey2: false,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    nameRules: [(v) => !!v || "Preencha este campo"],
    emailRules: [(v) => /.+@.+\..+/.test(v) || "Informe um e-mail válido"],
    passwordRules: [(v) => !!v || "Informe uma senha"],
    confirmPasswordRules: [(v) => !!v || "Digite igual ao campo anterior"],
    emailConfirm: null,
  }),
  methods: {
    createUser() {
      this.loading = true;
      axios
        .post('account/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // ------ ENVIA CONFIRMAÇÂO PARA O E-MAIL ------- //
          axios.post('account/confirm', {
            email: this.email,
          }).then(response => {
            sessionStorage.setItem("userEmail", this.email);
            sessionStorage.setItem("userName", response.data.message.user.firstName);
          }).catch(error => {
            this.response = error
          })
          // ------ ENVIA CONFIRMAÇÂO PARA O E-MAIL ------- //
          this.emailConfirm = response.data.message.description;
          this.emailConfirm = false;
          this.$router.push({
            name: "email-confirmation",
            email: sessionStorage.getItem("userEmail")
          });
        })
        .catch((error) => {
          this.emailConfirm = error.response.data.error.message;
        })
        .finally(() => {
          this.loading = false
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
