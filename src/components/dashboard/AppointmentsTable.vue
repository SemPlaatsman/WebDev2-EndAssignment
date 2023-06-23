<template>
    <section class="container">
        <div class="p-2 actions-panel text-center">
            <label for="page">Page: </label>
            <input v-model="page" class="col-1 mx-3" min="1" type="number" id="page">
            <label for="limit">Limit: </label>
            <input v-model="limit" class="col-1 mx-3" min="1" type="number" id="limit">
        </div>
        <div class="table-container">
            <Loading v-if="this.appointments === null"/>
            <div v-else-if="this.appointments.length === 0">
                <h1 class="text-center text-primary-green p-5 pb-0">Sorry!</h1>
                <p class="text-center pb-5">
                    I'm sorry but there are no appointments to be found here...<br>
                    Take a look at our <a href="/cats" class="text-primary-green">Cats page</a> to make an appointment!
                </p>
            </div>
            <table class="table" v-else-if="this.appointments.length > 0">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User ID</th>
                        <th scope="col">Date & Time</th>
                        <th scope="col-1">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="appointment in appointments">
                        <th>{{ appointment.id }}</th>
                        <th>{{ appointment.userId }}</th>
                        <th>{{ appointment.datetime }}</th>
                        <td>
                            <button @click="deleteAppointment(appointment.id)" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="alert alert-danger mt-3" role="alert" v-if="error">
            {{ this.error }}
        </div>
        <div class="alert alert-success mt-3" role="alert" v-if="success">
            {{ this.success }}
        </div>
    </section>
</template>

<script>
import Loading from '../Loading.vue';

import { axiosTFFDB } from '../../axios-auth';

export default {
    name: "AppointmentsTable",
    components: {
        Loading
    },
    data() {
        return {
            appointments: null,
            page: 1,
            limit: 9,
            error: '',
            success: ''
        }
    },
    created() {
        this.getAppointments();
    },
    watch: {
        'page'(newVal) {
            if (!newVal || newVal < 1) {
                this.page = 1;
            }
            this.appointments = null;
            this.getAppointments()
        },
        'limit'(newVal) {
            if (!newVal || newVal < 1) {
                this.limit = 9;
            }
            this.appointments = null;
            this.getAppointments()
        }
    },
    methods: {
        getAppointments() {
            axiosTFFDB.get(('appointments?offset=' + (((this.page ?? 1) - 1) * this.limit) + '&limit=' + (this.limit ?? 9)))
            .then(result => {
                this.appointments = result.data;
                console.log(this.appointments);
            })
            .catch(error => {
                this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data.errorMessage ?? "Something went wrong while trying to load all appointments!");
            });
        },
        deleteAppointment(appointmentId) {
            if (!appointmentId) {
                this.error = "This button is not associated with an appointment!";
                return;
            }
            
            if (!confirm(('Are you sure you want to delete an appointment with id ' + appointmentId + '?'))) {
                return;
            }

            axiosTFFDB.delete(('/appointments/' + appointmentId))
                .then(() => {
                    this.success = ("Successfully deleted appointment with id " + appointmentId);
                    this.getAppointments();
                })
                .catch(error => {
                    this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data.errorMessage ?? "Something went wrong while trying to delete an appointment!");
                });
        }
    }
}
</script>

<style scoped>
.container > .table-container {
    max-height: 70vh !important;
    overflow: auto;
}

.container > .btn {
    color: white;
    background-color: var(--primary-green);
}

table > thead > tr > th {
    color: var(--primary-green);
}
</style>