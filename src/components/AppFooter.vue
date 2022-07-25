<template>
    <v-footer padless color="#012A4A">
     <div class="mx-auto white">
      <label for="">Trocar idioma: </label>
      <select v-model="lang" @change="switchSelect($event)">
        <option value="pt" selected>Português</option>
        <option value="en">English</option>
        <option value="es">Espanõl</option>
      </select>
    </div>
        <v-col class="text-center white--text" cols="12">

            <v-tooltip top v-for="(i, index) in authors" :key="index" class="mx-10 white--text">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text class="white--text" v-bind="attrs" :href="i.link" target="_blank" v-on="on">
                        <v-icon white class="mr-2"> mdi-github </v-icon>
                        {{ i.name }}
                    </v-btn>
                </template>
                <span>{{ i.function }}</span>

            </v-tooltip>

            <p class="mt-4">Copyright {{ new Date().getFullYear() }} - <strong>Home-Works</strong></p>

        </v-col>


    </v-footer>
</template>

<script>
export default {
    name: 'AppFooter',
    data () {
        const lang = localStorage.getItem('lang') || 'pt' 
        return {
        lang: lang,
        accessToken: sessionStorage.getItem("accessToken"),
        authors: [
            {
                name: 'Paul Pessoa',
                link: 'https://github.com/paulpessoa/home-works',
                function: 'Front Engineer'
            },
            {
                name: 'Jean de Paula',
                link: 'https://github.com/jeancarlospaula/homeworks',
                function: 'Backend Developer'
            }
        ],
    }
    },
    methods: {
        switchSelect(event) {
            localStorage.setItem('lang', event.target.value)
            console.log("idioma selecionado: ", localStorage.getItem('lang'))
        }
    }
}
</script>