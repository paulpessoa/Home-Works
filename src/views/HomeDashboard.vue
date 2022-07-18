<template>
  <div>
  <div v-if="accessToken">
      <TaskTable/>      
    <div v-if="null">
      <p> cadastrar atividade </p>
      <TaskRegister/>
      <p> minhas atividades</p>
      <TaskRemove/>
      <TaskReport/>
      <TaskDone/>
      <SubjectRegister/>

    </div>      

  </div>
  
  <FormLogin v-else/>
  

  </div>

</template>

<script lang="ts">
  
  
  import Vue from 'vue'
  import TaskRegister from "@/components/tasks/TaskRegister.vue"
  import TaskRemove from "@/components/tasks/TaskRemove.vue"
  import TaskReport from "@/components/tasks/TaskReport.vue"
  import TaskDone from "@/components/tasks/TaskDone.vue"
  import SubjectRegister from "@/components/tasks/SubjectRegister.vue"
  import FormLogin from "@/components/FormLogin.vue"
  import TaskTable from "@/components/tasks/TaskTable.vue"

  export default Vue.extend({
    name: 'HomeDashboard',
    data: () => ({
      accessToken: sessionStorage.getItem("accessToken"),
    }),
  
    components: {
      TaskTable,
      TaskRegister,
      TaskRemove,
      TaskReport,
      TaskDone,
      SubjectRegister,
      FormLogin
    },    
  })
</script>
