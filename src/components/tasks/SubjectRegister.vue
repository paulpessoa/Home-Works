<template>
  <v-dialog v-model="dialogSubject" max-width="350px">

    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#012A4A" outlined class="mb-2" v-bind="attrs" v-on="on">
        <v-icon small color="orange" class="mr-2">
          mdi-card-plus
        </v-icon>
        Disciplinas
      </v-btn>
    </template>

    <v-card class="py-4">
    <v-card-title>Gerenciar Disciplinas</v-card-title>
      <v-card-text class="pa-4">
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-alert class="mb-4 white--text text-center" v-if="isLoading" color="green">Disciplina adicionada com
              sucesso!</v-alert>
            <v-text-field outlined v-model="subjects" dense hide-details label="Nova Disciplina"></v-text-field>
          </v-col>
        </v-row>

      </v-card-text>

      <v-card-actions>
        <v-btn icon @click="saveSubject" color="red" :loading="isLoading">
              <v-icon>mdi-delete-empty</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="dialogSubject = false">
          Cancelar
        </v-btn>
        <v-btn color="#012A4A" dark @click="saveSubject" :loading="isLoading">
          Salvar
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>


</template>

<script>
import axios from "axios";
const URL_SUBJECTS = 'http://localhost:3000/subjects'

export default {
  name: 'SubjectRegister',
  data() {
    return {
      dialogSubject: false,
      subject: '',
      subjectList: null,
      isLoading: false
    }
  },
  watch: {
    dialogSubject(val) {
      val || this.close()
    },
  },
  created() {
    this.listSubjects()
  },
  methods: {

    // Função adicionar nova disciplina
    saveSubject() {
      this.isLoading = true
      axios.post(URL_SUBJECTS, {
        name: this.subjects
      }).then(response => {
        this.subjects = response.data
        setInterval(() => {
          this.isLoading = false
          this.dialogSubject = false
        }, 1500);
        //this.subjects = ''
        window.location.reload()
      }).catch(error => {
      })
    }
  }
}
</script>