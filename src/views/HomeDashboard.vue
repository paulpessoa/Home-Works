<template>
<<<<<<< HEAD
  <TableActivities />
=======
      <TableActivities/>        
>>>>>>> de7073ff0a1ccf4d06b4b56eb8fc29184c9c83c1
</template>

<script>
  import TaskRegister from "@/components/tasks/TaskRegister.vue"
  import TaskRemove from "@/components/tasks/TaskRemove.vue"
  import TaskReport from "@/components/tasks/TaskReport.vue"
  import TaskDone from "@/components/tasks/TaskDone.vue"
  import SubjectRegister from "@/components/tasks/SubjectRegister.vue"
  import TableActivities from "@/components/tasks/TableActivities.vue"
  export default {
    name: 'HomeDashboard',
    data: () => ({
      accessToken: sessionStorage.getItem("accessToken"),
    }),
    created() {
      if (!this.accessToken) {
        this.$router.push("/login");
      }
    },
    components: {
      TableActivities,
      TaskRegister,
      TaskRemove,
      TaskReport,
      TaskDone,
      SubjectRegister,
    }, 
<<<<<<< HEAD
      }
=======
    created: {
      pushLogin() {
      if (this.accessToken) {
        this.$router.push("/login");
      }
    }
  }  
  }
>>>>>>> de7073ff0a1ccf4d06b4b56eb8fc29184c9c83c1
</script>
