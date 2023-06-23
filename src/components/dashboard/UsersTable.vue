<template>
    <section class="container">
        <div class="p-2 actions-panel text-center">
            <label for="page">Page: </label>
            <input v-model="page" class="col-1 mx-3" min="1" type="number" id="page">
            <label for="limit">Limit: </label>
            <input v-model="limit" class="col-1 mx-3" min="1" type="number" id="limit">
        </div>
        <div class="table-container">
            <Loading v-if="this.users === null"/>
            <div v-else-if="this.users.length === 0">
                <h1 class="text-center text-primary-green p-5 pb-0">Sorry!</h1>
                <p class="text-center pb-5">
                    I'm sorry but there are no users to be found here...<br>
                    Have you looked in the fridge?
                </p>
            </div>
            <table class="table" v-else-if="this.users.length > 0">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                        <th scope="col-1">Email</th>
                        <th scope="col-1">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <th>{{ user.id }}</th>
                        <th>{{ user.username }}</th>
                        <th>{{ roleToName(user.role) }}</th>
                        <th>{{ user.email }}</th>
                        <td>
                            <button @click="deleteUser(user.id)" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
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

import { roleToName } from '../../assets/role.js';
import { axiosTFFDB } from '../../axios-auth';

export default {
    name: "UsersTable",
    components: {
        Loading
    },
    data() {
        return {
            users: null,
            roleToName,
            page: 1,
            limit: 9,
            error: '',
            success: ''
        }
    },
    created() {
        this.getUsers();
    },
    watch: {
        'page'(newVal) {
            if (!newVal || newVal < 1) {
                this.page = 1;
            }
            this.users = null;
            this.getUsers()
        },
        'limit'(newVal) {
            if (!newVal || newVal < 1) {
                this.limit = 9;
            }
            this.users = null;
            this.getUsers()
        }
    },
    methods: {
        getUsers() {
            axiosTFFDB.get(('users?offset=' + (((this.page ?? 1) - 1) * this.limit) + '&limit=' + (this.limit ?? 9)))
            .then(result => {
                this.users = result.data;
                console.log(this.users);
            })
            .catch(error => {
                this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data.errorMessage ?? "Something went wrong while trying to load all users!");
            });
        },
        deleteUser(userId) {
            if (!userId) {
                this.error = "This button is not associated with a user!";
                return;
            }
            
            if (!confirm(('Are you sure you want to delete a user with id ' + userId + '?'))) {
                return;
            }

            axiosTFFDB.delete(('/users/' + userId))
                .then(() => {
                    this.success = ("Successfully deleted user with id " + userId);
                    this.getUsers();
                })
                .catch(error => {
                    this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data.errorMessage ?? "Something went wrong while trying to delete a user!");
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