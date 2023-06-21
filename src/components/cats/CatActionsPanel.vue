<template>
    <div class="py-2 actions-panel">
        <label for="page">Page: </label>
        <input v-model="localPage" class="col-1 mx-3" min="1" type="number" id="page">
        <label for="limit">Limit: </label>
        <input v-model="localLimit" class="col-1 mx-3" min="1" type="number" id="limit">
    </div>
</template>
  
<script>
export default {
    name: "CatActionPanel",
    props: ['page', 'limit'],
    computed: {
        localPage: {
            get() {
                return this.page;
            },
            set(value) {
                this.$emit('update:page', value);
            }
        },
        localLimit: {
            get() {
                return this.limit;
            },
            set(value) {
                this.$emit('update:limit', value);
            }
        },
    },
};
</script>

<style scoped>
.actions-panel > input[type=number] {
    border: 2px solid;
    border-color: var(--primary-green);
}
</style>