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
                return (cat.hasOwnProperty('prop') && cat.hasOwnProperty('prop') && cat.hasOwnProperty('prop') && cat.hasOwnProperty('prop'))
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