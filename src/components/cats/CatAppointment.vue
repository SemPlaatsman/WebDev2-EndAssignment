<template>
    <section class="container d-flex flex-column pt-4 pb-1">
        <div v-if="this.cat" class="col-12 justify-content-center pb-4">
            <img :src="this.cat.url" alt="Cat cover">
        </div>
        <h2 class="text-center">Schedule your <span class="text-primary-green">appointment...</span></h2>
        <p class="w-75 mx-auto">
            Welcome to the Felis Foundation's appointment page! We're thrilled you're considering providing a loving home for one of our cats. 
            Please select a suitable date and time for your appointment below. Make sure to make an appointment at least one week in the future! 
            During this meeting, we'll guide you through the adoption process, answer your queries, and introduce you to our wonderful cats. 
            We look forward to helping you find your perfect feline companion!
        </p>
        <section class="container d-flex align-items-center flex-grow-1 pb-5">
            <div class="row justify-content-center col-md-12">
                <div class="col-md-6 h-50">
                    <form @submit.prevent="submitAppointment" class="mb-3">
                        <div class="mb-3">
                            <label for="inputDatetime" class="form-label text-primary-green fw-bold fs-4 mb-0">Date & Time</label>
                            <p class="mb-0">(at least one week into the future between 10:00 and 18:00)</p>
                            <input required  v-model="appointmentData.datetime" type="datetime-local" class="form-control" name="inputDatetime" id="inputDatetime">
                        </div>
                        <div class="d-flex align-items-center justify-content-center pb-3">
                            <button type='submit' class="btn btn-primary w-25">SUBMIT</button>
                        </div>
                        <div class="alert alert-danger" role="alert" v-if="error">
                            {{ this.error }}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { axiosCatAPI, axiosTFFDB } from '../../axios-auth';
import { userAuthStore } from '../../stores/auth-store';

export default {
    name: "CatAppointment",
    data() {
        return {
            error: '',
            cat: null,
            store: userAuthStore(),
            appointmentData: {
                datetime: '2023-07-03T12:59:00'
            }
        }
    },
    watch: {
        'appointmentData.datetime'(newVal) {
            if (!newVal) {
                this.appointmentData.datetime = '';
            } else if (newVal.slice(2) != '00') {
                this.appointmentData.datetime = newVal.slice(0, -2) + "00";
            }
        }
    },
    created() {
        this.loadCatData();
    },
    methods: {
        submitAppointment() {
            if (Date.parse(this.appointmentData.datetime) - Date.parse(new Date()) < (7 * 24 * 60 * 60 * 1000)) {
                this.error = "Date & Time must be at least one week into the future!";
                return;
            } else if (new Date(this.appointmentData.datetime).getHours() < 10 || new Date(this.appointmentData.datetime).getHours() > 17) {
                this.error = "Time must be between 10:00 and 18:00!";
                return;
            }

            const appointmentRequestDTO = {
                id: this.cat.id,
                userId: this.store.id,
                datetime: (this.appointmentData.datetime.replace('T', ' ') + ':00')
            }
            axiosTFFDB.post("/appointments", appointmentRequestDTO)
                .then(response => {
                    this.$router.push('/profile');
                })
                .catch(error => {
                    console.log(error);
                    this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data.errorMessage ?? "Something went wrong while trying to make an appointment");
                });

            this.error = '';
        },
        loadCatData() {
          axiosCatAPI.get(("images/" + this.$route.params.id))
            .then(response => {
                this.cat = response.data
                console.log(this.cat)
            })
            .catch(error => {
                this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data ?? "Something went wrong while trying to load a cat with id " + this.$route.params.id + ". <br>Please try again...");
            })
        }
    }
}
</script>

<style scoped>
img {
  max-width: 50%;
  max-height: 33vh;
  height: auto;
  object-fit: contain;
  border: 5px solid var(--primary-green);
}

#app > .container > *:not(.container select) {
    text-align: center;
}
</style>