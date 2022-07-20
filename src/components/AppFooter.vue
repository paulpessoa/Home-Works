<template>
    <v-footer v-if="accessToken" padless color="#012A4A">
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
    data: () => ({
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
    }),
}
</script>