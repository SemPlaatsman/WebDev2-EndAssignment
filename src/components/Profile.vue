<template>
    <section class="container d-flex justify-content-center align-content-start row mx-auto p-4 pt-2 text-center">
        <h1>Profile of <span class="text-primary-green">{{ store.username }}</span></h1>
        <dl class="row col-12 py-3">
            <div class="col-4 text-end">
                <dt>Username</dt>
                <dd>{{ store.username }}</dd>
            </div>
            <div class="col-4">
                <dt>Email</dt>
                <dd>{{ store.email }}</dd>
            </div>
            <div class="col-4 text-start">
                <dt>Role</dt>
                <dd>{{ roleToName(parseInt(store.role)) }}</dd>
            </div>
        </dl>
    </section>
</template>

<script>
import { roleToName } from '../assets/role.js';
import { axiosTFFDB } from '../axios-auth';
import { userAuthStore } from '../stores/auth-store';

export default {
    name: "Profile",
    data() {
        return {
            store: userAuthStore(),
            roleToName
        }
    }
}
</script>

<style scoped>

</style>