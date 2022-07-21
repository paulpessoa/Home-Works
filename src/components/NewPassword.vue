<template>
  <div class="pa-6">
    <v-card elevation="0" class="mx-auto px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">NOVA SENHA</v-card-title>
      <v-form ref="form">
        <v-text-field filled :append-icon="showKey1 ? 'mdi-eye' : 'mdi-eye-off'" :type="showKey1 ? 'text' : 'password'"
          label="Nova Password" required outlined @click:append="showKey1 = !showKey1">
        </v-text-field>
        <v-text-field filled :append-icon="showKey2 ? 'mdi-eye' : 'mdi-eye-off'" :type="showKey2 ? 'text' : 'password'"
          label="Password Confirm" required persistent-hint outlined @click:append="showKey2 = !showKey2">
        </v-text-field>
        <v-btn block x-large type="submit" color="#012a4a" depressed class="justify-center white--text">CONFIRM</v-btn>
      </v-form>
      <v-card-actions class="text-xs-center py-4">
        <v-btn block x-large color="orange lighten-2" text href="/home"> CANCEL </v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script lang="ts">
export default {
  name: 'NewPassword',

}
</script>
