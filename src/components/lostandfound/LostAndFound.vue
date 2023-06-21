<template>
    <section class="container p-5 pt-2">
        <h2>Lost or found a cat?</h2>
        <p class="w-75 mx-auto">
            Welcome to the Lost and Found page of our cat shelter! 
            We understand how distressing it can be when a beloved feline companion goes missing or when you come across a stray cat in need of help. 
            So together, let's ensure that every furry friend finds their way back or discovers a new loving family!
        </p>
        <div class="pt-2 px-2 actions-panel">
            <a href="/lostandfound/report/lost">
                <button class="btn text-white float-start lost">REPORT LOST</button>
            </a>
            <label for="page">Page: </label>
            <input v-model="page" class="col-1 mx-3" min="1" type="number" id="page">
            <label for="limit">Limit: </label>
            <input v-model="limit" class="col-1 mx-3" min="1" type="number" id="limit">
            <label for="status">Status: </label>
            <select v-model="status" class="col-2 mx-3 p-1" id="status">
                <option value="">All</option>
                <option v-for="(value, name) in this.catStatus" :value="value">
                    {{ name.replace(/([a-z])([A-Z])/g, '$1 $2') }}
                </option>
            </select>
            <a href="/lostandfound/report/found">
                <button class="btn text-white float-end found">REPORT FOUND</button>
            </a>
        </div>
        <LostAndFoundList :page="this.page" :limit="this.limit" :status="this.status" />
    </section>
</template>

<script>
import { catStatus } from '../../assets/catstatus.js';
import LostAndFoundList from './LostAndFoundList.vue';

export default {
    name: "LostAndFound",
    components: {
        LostAndFoundList
    },
    data() {
        return {
            page: 1,
            limit: 9,
            status: '',
            catStatus
        }
    }
}
</script>

<style scoped>
#app > .container > *:not(.container) {
    text-align: center;
}

.actions-panel button.lost {
    background-color: var(--error-red);
}
.actions-panel button.found {
    background-color: var(--casual-blue);
}
</style>