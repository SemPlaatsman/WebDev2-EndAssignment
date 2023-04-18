<template>
    <section class="container row mx-auto py-4">
        <CatListItem v-for="cat in cats" :cat="cat" :key="cat.id"/>
    </section>
</template>

<script>
import CatListItem from './CatListItem.vue';
import { axiosCatAPI } from '../../axios-auth';

export default {
    name: "CatList",
    async setup() {
        try {
            const result = await axiosCatAPI.get('images/search?has_breeds=1&limit=15');
            const cats = result.data.filter(function(cat) {
                return (cat.hasOwnProperty('id') && cat.hasOwnProperty('url') && cat.breeds[0].hasOwnProperty('temperament') && cat.breeds[0].hasOwnProperty('name') && cat.breeds[0].hasOwnProperty('description'))
            });
            return {
                cats
            }
        } catch (error) {
            console.log(error)
        }
    },
    components: {
        CatListItem
    }
}
</script>

<style scoped>

</style>