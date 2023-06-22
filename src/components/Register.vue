<template>
    <section class="container d-flex align-items-center">
        <div class="row justify-content-center col-md-12">
            <div class="col-md-6">
                <h1 class="display-4 text-center mb-3">Register</h1>
                <form @submit.prevent="register" class="mb-3">
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label text-primary-green fw-bold fs-4">Email</label>
                        <input required id="inputEmail" type="text" class="form-control" v-model="user.email" />
                    </div>
                    <div class="mb-3">
                        <label for="inputUsername" class="form-label text-primary-green fw-bold fs-4 mb-0">Username</label>
                        <p class="mb-0">(of at least 3 characters long...)</p>
                        <input required id="inputUsername" type="text" class="form-control" v-model="user.username" />
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label text-primary-green fw-bold fs-4 mb-0">Password</label>
                        <p class="mb-0">(of at least 6 characters long...)</p>
                        <input required type="password" class="form-control" id="inputPassword" v-model="user.password" />
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                        <button type='submit' class="btn btn-primary w-25 float-start">SUBMIT</button>
                        <a href="/login" class="text-decoration-none ms-auto">Already have an account?</a>
                    </div>
                    <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                        {{ this.errorMessage }}
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import { axiosTFFDB } from '../axios-auth';

export default {
    name: "Register",
    data() {
        return {
            user: {
                email: "",
                username: "",
                password: "",
                role: 1
            },
            errorMessage: ""
        };
    },
    methods: {
        async register() {
            await axiosTFFDB.post('users/register', this.user)
            .then((res) => {
                console.log(res);
            }).catch((error) => {
                this.errorMessage = error.response.data.errorMessage;
            })
        }
    }
}
</script>

<style scoped>

</style>