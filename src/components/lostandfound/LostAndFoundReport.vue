<template>
    <section class="container d-flex flex-column py-4 pb-5">
        <h2 class="text-center">Report <span v-if="typeof reportData.status == 'number'" class="text-primary-green fw-bold">{{ statusToName(reportData.status).fromCamelToRegularCase().toLowerCase() }}</span> cat</h2>
        <p class="w-75 mx-auto">
            Welcome to The Felis Foundation's Lost & Found report page. If you've lost or found a cat, we're here to help. 
            Simply fill out the form, providing all relevant details and a recent photo. 
            Our dedicated community works tirelessly to facilitate joyful reunions between cats and their families. 
            We appreciate your contribution in helping our feline friends find their way back home.
        </p>
        <section class="container d-flex align-items-center flex-grow-1 pb-5">
            <div class="row justify-content-center col-md-12">
                <div class="col-md-6 h-50">
                    <form @submit.prevent="submitReport" class="mb-3">
                        <div class="mb-3">
                            <label for="inputStatus" class="form-label text-primary-green fw-bold fs-4">Status</label>
                            <select required v-model="reportData.status" class="form-control" id="inputStatus">
                                <option value="" selected disabled>Please select an option:</option>
                                <option v-for="(value, name) in this.catStatus" :value="value">
                                    {{ name.replace(/([a-z])([A-Z])/g, '$1 $2') }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="inputImage" class="form-label text-primary-green fw-bold fs-4">Image</label>
                            <input required class="form-control" type="file" id="inputImage" accept="image/jpeg, image/jpg, image/png, image/gif" @change="onFileChange">
                        </div>
                        <div class="mb-3">
                            <label for="inputBreeds" class="form-label text-primary-green fw-bold fs-4">Breeds</label>
                            <div class="d-flex flex-column">
                                <input class="mb-2" type="text" v-model="newBreed" @keydown.enter.prevent="addBreed" placeholder="Enter a breed and press Enter" />
                                <div class="row px-3">
                                    <div v-for="(breed, index) in reportData.breeds" :key="index" class="d-inline-block py-1 border border-1 col-3">
                                        {{ breed }}
                                        <button class="text-error-red fw-bold border-0 bg-transparent" @click="removeBreed(index)">X</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="inputDescription" class="form-label text-primary-green fw-bold fs-4">Description</label>
                            <textarea required class="form-control" placeholder="e.g. Grey male cat last seen on J. Doe Street at 2023-07-2 16:43:00" id="inputDescription" v-model="reportData.description"></textarea>
                        </div>
                        <div class="d-flex align-items-center justify-content-center">
                            <button type='submit' class="btn btn-primary w-25">SUBMIT</button>
                        </div>
                        <div class="alert alert-danger mt-3" role="alert" v-if="error">
                            {{ this.error }}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { catStatus, statusToName, nameToStatus } from '../../assets/catstatus';

export default {
    name: "LostAndFoundReport",
    data() {
        return {
            catStatus,
            statusToName,
            reportData: {
                status: nameToStatus(this.$route.params.status ?? "") ?? "0",
                breeds: ['bob'],
                image: null,
                description: 'noway'
            },
            error: ''
        }
    },
    created() {
        console.log(this.$route.params);
    },
    methods: {
        async submitReport() {
            if (this.reportData.breeds.length < 1) {
                this.error = "Please select at least one breed!"
                return;
            }
            console.log(this.reportData);
        },
        addBreed() {
            if (this.newBreed.trim() !== '') {
                this.reportData.breeds.push(this.newBreed.trim());
                this.newBreed = '';
            }
        }, 
        removeBreed(index) {
            this.reportData.breeds.splice(index, 1);
        },
        onFileChange(event) {
            this.reportData.image = event.target.files[0];
        }
    },
}
</script>

<style scoped>
#app > .container > *:not(.container select) {
    text-align: center;
}
</style>