<template>
    <section class="container px-0">
        <section class="col-12">
            <button class="col-4 btn bg-white border border-3 border-black rounded-0 table-btn" @click="changeTable">Appointments</button>
            <button class="col-4 btn bg-white border border-3 border-black rounded-0 table-btn selected" @click="changeTable">Cats</button>
            <button class="col-4 btn bg-white border border-3 border-black rounded-0 table-btn" @click="changeTable">Users</button>
        </section>
        <section class="p-3">
            <AppointmentsTable v-if="selectedTable === 'appointments'" />
            <CatsTable v-else-if="selectedTable === 'cats'" />
            <UsersTable v-else-if="selectedTable === 'users'" />
            <div v-else>
                <h1 class="text-center text-primary-green p-5 pb-0">Hey there!</h1>
                <p class="text-center pb-5">
                    Please select the table you want to check out!<br>
                    Or just look at this text all day...
                </p>
            </div>
        </section>
    </section>
</template>

<script>
import AppointmentsTable from './AppointmentsTable.vue';
import CatsTable from './CatsTable.vue';
import UsersTable from './UsersTable.vue';

export default {
    name: "Dashboard",
    components: {
        AppointmentsTable,
        CatsTable,
        UsersTable
    },
    data() {
        return {
            selectedTable: 'cats'
        }
    },
    methods: {
        changeTable(event) {
            const buttons = document.querySelectorAll('.table-btn');
            for (const button of buttons) {
                button.classList.remove("selected");
            }
            event.target.classList.add("selected");
            this.selectedTable = event.target.innerText.toLowerCase();
        }
    }
}
</script>

<style scoped>
button.selected {
    color: white !important;
    background-color: var(--primary-green) !important;
}
</style>