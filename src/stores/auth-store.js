import { defineStore } from 'pinia';
import { axiosTFFDB } from '../axios-auth';

export const userAuthStore = defineStore('auth', {
    state: () => ({
        jwt: '',
        id: '',
        username: '',
        email: '',
        role: ''
    }),
    getters: {
        isAuthenticated: (state) => state.jwt !== ''
    },
    actions: {
        autoLogin() {
            if(localStorage['jwt'] && localStorage['id'] && localStorage['username'] && localStorage['email'] && localStorage['role']) {
                this.jwt = localStorage['jwt'];
                this.id = localStorage['id'];
                this.username = localStorage['username'];
                this.email = localStorage['email'];
                this.role = localStorage['role'];
                
                axiosTFFDB.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
            }
        },
        async login(username, password) {
            return new Promise((resolve, reject) => {
                // const result = await axiosTFFDB.post('users/login', { username: username, password: password });
                axiosTFFDB.post('users/login', { username: username, password: password })
                .then((res) => {
                    if (!res.data.jwt) {
                        throw new Error('Invalid login');
                    }
                    console.log(res);
                    this.jwt = res.data.jwt;
                    this.id = res.data.id;
                    this.username = res.data.username;
                    this.email = res.data.email;
                    this.role = res.data.role;
                    
                    localStorage.setItem('jwt', this.jwt);
                    localStorage.setItem('id', this.id);
                    localStorage.setItem('username', this.username);
                    localStorage.setItem('email', this.email);
                    localStorage.setItem('role', this.role);
                    
                    axiosTFFDB.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.jwt;
                    resolve();
                })
                .catch(error => {
                    reject(error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data ? error.response.data.errorMessage : "Something went wrong while trying to login!"));
                });
            });
        },
        logout() {
            this.jwt = '';
            this.id = '';
            this.role = '';
            this.username = '';
            this.email = '';

            localStorage.removeItem('jwt');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            localStorage.removeItem('username');
            localStorage.removeItem('email');

            localStorage.clear();

            axiosTFFDB.defaults.headers.common['Authorization'] = '';
        }
    },
    created() {
        this.autoLogin()
    }
});