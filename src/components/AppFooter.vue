<template>
    <v-footer padless color="#f0f0f0">
      
        <v-col class="text-center dark--text" cols="12">
            <v-tooltip top v-for="(i, index) in authors" :key="index" class="mx-10 white--text">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text class="dark--text" v-bind="attrs" :href="i.link" target="_blank" v-on="on">
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
        return {
        language: window.navigator.language,
        accessToken: sessionStorage.getItem("accessToken"),
        authors: [
            {
                name: 'Paul Pessoa',
                link: 'https://github.com/paulpessoa/home-works',
                function: 'Frontend Engineer'
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
        
    }
}
</script>