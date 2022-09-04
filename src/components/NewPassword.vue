<template>
  <div class="pa-6">
    <v-card elevation="0" class="mx-auto px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">{{$t('change_password')}}</v-card-title>
      <v-form ref="form">
        <v-text-field filled :append-icon="showKey1 ? 'mdi-eye' : 'mdi-eye-off'" :type="showKey1 ? 'text' : 'password'"
          :label="$t('new_password')" required outlined @click:append="showKey1 = !showKey1">
        </v-text-field>
        <v-btn block x-large type="submit" color="#6557F5" :loading="loading" depressed class="justify-center white--text">{{$t('confirm')}}</v-btn>
      </v-form>
      <v-card-actions class="row justify-center py-4">
        <v-btn class="ma-4" block color="orange lighten-2" text to="/"> {{$t('cancel')}}</v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script lang="ts">
export default {
  name: 'NewPassword',
  data: () => ({ 
    showKey1: false,
    loading: null
  }),
}
</script>
