<template>
    <section class="container">
        <div class="p-2 actions-panel text-center">
            <label for="page">Page: </label>
            <input v-model="page" class="col-1 mx-3" min="1" type="number" id="page">
            <label for="limit">Limit: </label>
            <input v-model="limit" class="col-1 mx-3" min="1" type="number" id="limit">
            <label for="status">Status: </label>
            <select v-model="status" class="col-2 mx-3 p-1" id="status">
                <option value="">All</option>
                <option v-for="(value, name) in catStatus" :value="value">
                    {{ name.fromCamelToRegularCase() }}
                </option>
            </select>
        </div>
        <div class="table-container">
            <Loading v-if="this.cats === null"/>
            <div v-else-if="this.cats.length === 0">
                <h1 class="text-center text-primary-green p-5 pb-0">Sorry!</h1>
                <p class="text-center pb-5">
                    I'm sorry but there are no cats to be found here...<br>
                    Have you looked under the couch?
                </p>
            </div>
            <table class="table" v-else-if="this.cats.length > 0">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User email</th>
                        <th scope="col">Image</th>
                        <th scope="col">Breeds</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col-1">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cat in cats">
                        <th>{{ cat.id }}</th>
                        <td>{{ cat.userEmail }}</td>
                        <td><img :src="cat.encodedImage" alt="Cat cover" :class="statusToName(cat.status).toLowerCase()"></td>
                        <td>{{ cat.breeds.join(', ') }}</td>
                        <td>{{ cat.description }}</td>
                        <td>{{ statusToName(cat.status) }}</td>
                        <td>
                            <button @click="deleteCat(cat.id)" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
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

import { catStatus, statusToName } from '../../assets/catstatus';
import { axiosTFFDB } from '../../axios-auth';

export default {
    name: "CatsTable",
    components: {
        Loading
    },
    data() {
        return {
            cats: null,
            statusToName,
            catStatus,
            page: 1,
            limit: 9,
            status: '',
            error: '',
            success: ''
        }
    },
    created() {
        this.getCats();
    },
    watch: {
        'page'(newVal) {
            if (!newVal || newVal < 1) {
                this.page = 1;
            }
            this.cats = null;
            this.getCats()
        },
        'limit'(newVal) {
            if (!newVal || newVal < 1) {
                this.limit = 9;
            }
            this.cats = null;
            this.getCats()
        },
        'status'(newVal) {
            if (newVal < -1 || newVal > catStatus.InShelter) {
                this.status = '';
            }
            console.log(newVal);
            this.cats = null;
            this.getCats();
        }
    },
    methods: {
        getCats() {
            axiosTFFDB.get(('cats?offset=' + (((this.page ?? 1) - 1) * this.limit) + '&limit=' + (this.limit ?? 9) + '&status=' + (this.status ?? '')))
            .then(result => {
                this.cats = result.data.map(cat => {
                    return { ...cat, encodedImage: `data:image/${cat.imageFormat};base64,${cat.encodedImage}` };
                });
                console.log(this.cats);
            })
            .catch(error => {
                this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data.errorMessage ?? "Something went wrong while trying to load all cats!");
            });
        },
        deleteCat(catId) {
            if (!catId) {
                this.error = "This button is not associated with a cat!";
                return;
            }
            
            if (!confirm(('Are you sure you want to delete a cat with id ' + catId + '?'))) {
                return;
            }

            axiosTFFDB.delete(('/cats/' + catId))
                .then(() => {
                    this.success = ("Successfully deleted cat with id " + catId);
                    this.getCats();
                })
                .catch(error => {
                    this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data.errorMessage ?? "Something went wrong while trying to delete a cat!");
                });
        }
    }
}
</script>

<style scoped>
td > img {
    width: 100%;
    max-height: 200px;
    height: auto;
}

.container > .table-container {
    max-height: 70vh !important;
    overflow: auto;
}

.container > .btn {
    color: white;
    background-color: var(--primary-green);
}

img.lost {
    border: 3px solid var(--error-red);
}

img.found {
    border: 3px solid var(--casual-blue);
}

img.inshelter {
    border: 3px solid var(--primary-green);
}

table > thead > tr > th {
    color: var(--primary-green);
}
</style>