<template>
    <section class="container p-5 pt-2">
        <h2>Lost or found a cat?</h2>
        <p class="w-75 mx-auto">
            Welcome to the Lost and Found page of our cat shelter! 
            We understand how distressing it can be when a beloved feline companion goes missing or when you come across a stray cat in need of help. 
            So together, let's ensure that every furry friend finds their way back or discovers a new loving family!
        </p>
        <LostAndFoundActionsPanel :page="page" :limit="limit" :status="status"
            @update:page="page = $event" @update:limit="limit = $event" @update:status="status = $event" />
        <LostAndFoundList :page="this.page" :limit="this.limit" :status="this.status" />
        <LostAndFoundActionsPanel :page="page" :limit="limit" :status="status"
            @update:page="page = $event" @update:limit="limit = $event" @update:status="status = $event" />
    </section>
</template>

<script>
import { catStatus } from '../../assets/catstatus.js';
import LostAndFoundList from './LostAndFoundList.vue';
import LostAndFoundActionsPanel from './LostAndFoundActionsPanel.vue';

export default {
    name: "LostAndFound",
    components: {
        LostAndFoundList,
        LostAndFoundActionsPanel
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