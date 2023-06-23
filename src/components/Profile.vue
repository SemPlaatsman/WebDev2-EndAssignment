<template>
    <section class="container d-flex justify-content-center align-content-start row mx-auto p-4 pt-2 text-center">
        <h1>Profile of <span class="text-primary-green">{{ store.username }}</span></h1>
        <dl class="row col-12 py-3">
            <div class="col-4 text-end">
                <dt><h4 class="text-primary-green">Username</h4></dt>
                <dd class="fs-5">{{ store.username }}</dd>
            </div>
            <div class="col-4">
                <dt><h4 class="text-primary-green">Email</h4></dt>
                <dd class="fs-5">{{ store.email }}</dd>
            </div>
            <div class="col-4 text-start">
                <dt><h4 class="text-primary-green">Role</h4></dt>
                <dd class="fs-5">{{ roleToName(parseInt(store.role)) }}</dd>
            </div>
        </dl>
        <h2>Reported cats:</h2>
        <section class="container row mx-auto p-0 pb-3 text-start">
            <Loading v-if="this.cats === null"/>
            <div v-else-if="this.cats.length === 0">
                <h1 class="text-center text-primary-green p-5 pb-0">Sorry!</h1>
                <p class="text-center pb-5">
                    I'm sorry but there are no cats to be found here...<br>
                    Have you looked under the couch?
                </p>
            </div>
            <LostAndFoundListItem v-else="this.cats.length > 0" v-for="cat in cats" :cat="cat" :key="cat.id"/>
            <div class="alert alert-danger" role="alert" v-if="error">
                {{ this.error }}
            </div>
        </section>

        <h2>Appointments:</h2>
        <section class="container row mx-auto p-0 pb-3 text-start">
            <Loading v-if="this.appointments === null"/>
            <div v-else-if="this.appointments.length === 0">
                <h1 class="text-center text-primary-green p-5 pb-0">Sorry!</h1>
                <p class="text-center pb-5">
                    I'm sorry but there are no appointments to be found here...<br>
                    Take a look at our <a href="/cats" class="text-primary-green">Cats page</a> to make an appointment!
                </p>
            </div>
            <section class="col-lg-4 col-md-6 col-sm-12 p-2 d-flex align-items-stretch" v-else="this.appointments.length > 0" v-for="appointment in appointments" :key="appointment.id">
                <article class="border-3 border-black card flex-fill">
                    <h5 class="text-center py-2">At <span class="text-primary-green">{{ appointment.datetime }}</span></h5>
                    <section class="card border-0 h-100 align-items-center">
                        <a href="/">
                            <img :src="appointment.cat.url" alt="Cat cover">
                        </a>
                        <section class="card-body w-100">
                            <h5 class="card-title">{{ appointment.cat.breeds.map(breed => breed.name).join(', ') }}</h5>
                            <p class="card-text">{{ appointment.cat.breeds.map(breed => breed.temperament).join(', ') }}</p>
                        </section>
                    </section>
                    <section class="card-footer d-flex w-100">
                        <a :href="`/cats/${appointment.id}`" class="btn text-white me-auto">Read more...</a>
                    </section>
                </article>
            </section>
            <div class="alert alert-danger" role="alert" v-if="error">
                {{ this.error }}
            </div>
        </section>
    </section>
</template>

<script>
import Loading from './Loading.vue';
import LostAndFoundListItem from './lostandfound/LostAndFoundListItem.vue';
import { roleToName } from '../assets/role.js';
import { axiosCatAPI } from '../axios-auth';
import { axiosTFFDB } from '../axios-auth';
import { userAuthStore } from '../stores/auth-store';

export default {
    name: "Profile",
    components: {
        Loading,
        LostAndFoundListItem
    },
    data() {
        return {
            page: 1,
            limit: 9,
            status: '',
            store: userAuthStore(),
            roleToName,
            cats: null,
            appointments: null,
            error: ''
        }
    },
    created() {
        this.getCats();
        this.getAppointments();
    },
    methods: {
        getCats() {
            axiosTFFDB.get(('users/' + this.store.id + '/cats'))
            .then(result => {
                this.cats = result.data.map(cat => {
                    return { ...cat, encodedImage: `data:image/${cat.imageFormat};base64,${cat.encodedImage}` };
                });
                console.log(this.cats);
            })
            .catch(error => {
                this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data.errorMessage ?? "Something went wrong while trying to load all cats!");
            })
        },
        async getAppointments() {
            try {
                const result = await axiosTFFDB.get('users/' + this.store.id + '/appointments');
                const appointmentPromises = result.data.map(async (appointment) => {
                    const appointmentAPIData = await this.getAPICat(appointment.id);
                    return { ...appointment, cat: { ...appointmentAPIData } };
                });

                this.appointments = await Promise.all(appointmentPromises);
                console.log(this.appointments);
            } catch (error) {
                this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data.errorMessage ?? "Something went wrong while trying to load all cats!");
            }
        },
        async getAPICat($id) {
            try {
                const response = await axiosCatAPI.get("images/" + $id);
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.log(error)
                this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response?.data ?? "Something went wrong while trying to load a cat with id " + $id + ". <br>Please try again...");
            }
        }
    }
}
</script>

<style scoped>
.appointment-card {
    border-color: var(--primary-green);
}

a > img {
    width: 100%;
    max-height: 200px;
    height: auto;
}

.card-footer > .btn {
    background-color: var(--primary-green);
}
</style>