<template>
    <section class="container d-flex justify-content-center align-content-start row mx-auto text-center pb-3">
        <h1 class="pt-1">Welcome to <span>The Felis Foundation<span v-if="store.isAuthenticated">, {{ store.username }}</span>!</span></h1>
        <section class="home-body">
            <p>
                Welcome to <span>The Felis Foundation</span>, where feline friends find forever homes. We are dedicated to rescuing, rehabilitating, and rehoming cats in need. 
                We believe that every cat, regardless of age, breed, or health condition, deserves a warm home, nutritious food, and a loving family.
            </p>
            <p>
                At <span>The Felis Foundation</span>, we are committed to facilitating meaningful connections between people and cats. 
                If you are considering adding a feline member to your family, check out our <a href="/cats">Cats page</a>, where you can browse through profiles of our adorable, adoptable cats. 
                From kittens full of energy to serene seniors, there's a furry friend for everyone. 
                Once you've found a cat (or two!) that you connect with, schedule an appointment with us and start the journey to adoption.
            </p>
            <p>
                Are you or someone you know searching for a lost feline friend? Or have you found a cat and you're not sure if it's lost? 
                Head over to our <a href="/lostandfound">Lost & Found page</a>. 
                Here, you can report lost or found cats and browse the listings of cats that are missing or have been found in the local community. 
                Our aim is to reunite lost cats with their families and ensure every found cat is safe and cared for.
            </p>
            <p>
                Whether you're looking to adopt, found a lost cat, or seeking help with a cat you've found, <span>The Felis Foundation</span> is here to assist. 
                Let's work together to give every cat a loving home they deserve.
            </p>
            <p>
                Visit us today, because every cat's story deserves a purrfect ending!
            </p>
        </section>
    </section>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { userAuthStore } from '../stores/auth-store';

export default {
    name: "Home",
    components: {
        PulseLoader
    },
    data() {
        return {
            store: userAuthStore()
        }
    }
}
</script>

<style scoped>
a,
span {
    font-weight: bold;
    color: var(--primary-green);
}

h1 {
    height: 75px;
    max-height: 75px;
    padding-bottom: 0;
}

.home-body {
    min-height: calc(100vh - 225px); /* 75px for navigation + 50px for footer + 75px for title + 25px padding */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 10vh;
    flex: 100;
}
</style>