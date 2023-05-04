<template>
    <router-view/>
</template>

<script lang="ts">
import FormLogin from "@/components/FormLogin.vue"
import FormRegister from "@/components/FormRegister.vue"
import EmailConfirmation from '@/components/EmailConfirmation.vue'
import ResetPassword from "@/components/ResetPassword.vue"
import NewPassword from '@/components/NewPassword.vue'

  export default {
    name: 'PageAuth',
      data: () => ({
      userTocken: null,
    }),
    components: {
      FormLogin,
      FormRegister,
      EmailConfirmation,
      ResetPassword,
      NewPassword
    },
  }
</script>
