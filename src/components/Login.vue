<template>
    <section class="container d-flex align-items-center">
        <div class="row justify-content-center col-md-12">
            <div class="col-md-6">
                <h1 class="display-4 text-center mb-3">Login</h1>
                <form @submit.prevent="login" class="mb-3">
                    <div class="mb-3">
                        <label for="inputUsername" class="form-label text-primary-green fw-bold fs-4">Username</label>
                        <input required id="inputUsername" type="text" class="form-control" v-model="username" />
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label text-primary-green fw-bold fs-4">Password</label>
                        <input required type="password" class="form-control" id="inputPassword" v-model="password" />
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                        <button type='submit' class="btn btn-primary w-25 float-start">SUBMIT</button>
                        <a href="/register" class="text-decoration-none ms-auto">Don't have an account yet?</a>
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
import { userAuthStore } from '../stores/auth-store';

export default {
    name: "Login",
    setup() {
        return { store: userAuthStore() };
    },
    data() {
        return {
            username: "",
            password: "",
            errorMessage: ""
        };
    },
    methods: {
        async login() {
            // this.store.login(this.username, this.password)
            // .then(() => {
            //   this.$router.push('/products');
            // })
            // .catch(errorMessage => {
            //   this.errorMessage = errorMessage
            // });
            try {
                await this.store.login(this.username, this.password);
                this.$router.push('/');
            } catch (error) {
                this.errorMessage = error;
            }
        }
    }
}
</script>

<style scoped>

</style>