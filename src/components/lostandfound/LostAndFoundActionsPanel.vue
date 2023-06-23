<template>
    <div class="pt-2 px-2 actions-panel">
      <a href="/lostandfound/report/lost" v-if="store.isAuthenticated">
        <button class="btn text-white float-start lost pb-1">REPORT LOST</button>
      </a>
      <label for="page">Page: </label>
      <input v-model="localPage" class="col-1 mx-3" min="1" type="number" id="page">
      <label for="limit">Limit: </label>
      <input v-model="localLimit" class="col-1 mx-3" min="1" type="number" id="limit">
      <label for="status">Status: </label>
      <select v-model="localStatus" class="col-2 mx-3 p-1" id="status">
        <option value="">All</option>
        <option v-for="(value, name) in catStatus" :value="value">
          {{ name.fromCamelToRegularCase() }}
        </option>
      </select>
      <a href="/lostandfound/report/found" v-if="store.isAuthenticated">
        <button class="btn text-white float-end found pb-1">REPORT FOUND</button>
      </a>
    </div>
  </template>
  
  <script>
    import { userAuthStore } from '../../stores/auth-store.js';
  import { catStatus } from '../../assets/catstatus.js';

  export default {
    name: "LostAndFoundActionsPanel",
    props: ['page', 'limit', 'status'],
    data() {
        return {
            catStatus,
            store: userAuthStore()
        }
    },
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
      localStatus: {
        get() {
          return this.status;
        },
        set(value) {
          this.$emit('update:status', value);
        }
      }
    }
  };
  </script>

<style scoped>
.actions-panel button.lost {
    background-color: var(--error-red);
}

.actions-panel button.found {
    background-color: var(--casual-blue);
}

.actions-panel > select,
.actions-panel > input[type=number] {
    border: 2px solid;
    border-color: var(--primary-green);
}
</style>