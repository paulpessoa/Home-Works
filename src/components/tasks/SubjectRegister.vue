<template>
  <v-dialog v-model="dialogSubject" max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#6557F5" outlined class="mb-2" v-bind="attrs" v-on="on">
        <v-icon small color="orange" class="mr-2"> mdi-card-plus </v-icon>
        {{ $t("subjects") }}
      </v-btn>
    </template>

    <v-card class="py-4">
      <v-card-title class="justify-center">
        {{ $t("manage_subjects") }}
      </v-card-title>

      <v-alert class="ma-4 white--text text-center" dismissible v-if="msg" type="success">{{ msg }}</v-alert>

      <v-card-text class="pa-4">
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-text-field outlined v-model="subjects" dense hide-details :label="$t('new_subject')">
              <template v-slot:append-outer>
                <v-icon :key="`icon-${isEditing}`" v-if="!loading" :color="isEditing ? 'success' : 'info'"
                  @click="subjectCreate">
                  mdi-content-save</v-icon>
                <v-progress-circular indeterminate v-else :size="25" color="primary"></v-progress-circular>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">


            <v-select outlined dense hide-details v-model="deleteSubjects" :items="subjectList" item-text="name"
              item-value="_id" :label="$t('select_subject')">
              <template v-slot:append-outer>
                <v-icon :key="icon" color="error" @click="dialogDelete1 = true">mdi-delete-empty
                </v-icon>
              </template>
            </v-select>
          </v-col>



          </v-col>
        </v-row>

        <v-card-actions class="mt-4">
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialogSubject = false">fechar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card-text>

      <v-dialog v-model="dialogDelete1" max-width="450px">
        <v-card>
          <v-card-title class="body-1 justify-center">
            {{ $t("msg_delete_task") }}
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialogDelete1 = false">{{
                $t("cancel")
            }}</v-btn>
            <v-btn color="darken-1" dark @click="dialogDelete1 = false">{{
                $t("confirm")
            }}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
const URL_SUBJECT_CREATE = "https://homeworks-api.vercel.app/subject/create";
const URL_SUBJECT_LIST = "https://homeworks-api.vercel.app/subject/list";

export default {
  name: "SubjectRegister",
  data() {
    return {
      dialogDelete1: false,
      isEditing: false,
      isEditing1: false,
      msg: null,
      dialogSubject: false,
      subjects: [],
      subjectList: [],
      abacaxi: [],
      loading: false,
    };
  },
  watch: {
    dialogSubject(val) {
      val || this.close();
    },
  },

  methods: {
    // Lista as disciplinas
    listSubjects() {
      this.isLoading = true;
      axios
        .get(URL_SUBJECT_LIST, {})
        .then((response) => {
          this.subjectList = response.data;
        })
        .catch((error) => {
        })
        .finally(() => (this.isLoading = false));
    },
    reload() {
      window.location.reload();
    },
    // Função adicionar nova disciplina
    subjectCreate() {
      this.loading = true;
      axios
        .post(URL_SUBJECT_CREATE, {
          name: this.subjects,
        })
        .then((response) => {
          this.subjects = response;
          this.msg = response.data.message;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
          this.subjects = null;
          window.location.reload()
        });
    },
  },
  created() {
    this.listSubjects()
  }
};
</script>