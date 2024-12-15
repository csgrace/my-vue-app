<template>
  <div>
    <h1>Dashboard</h1>
    <div v-if="user">
      <p>Welcome, {{ user.name }}!</p>
      <PermissionControl :permissions="user.permissions" />
      <!-- Additional dashboard content based on user permissions can be added here -->
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <p>Please log in to access the dashboard.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PermissionControl from '../components/PermissionControl.vue';

export default {
  components: {
    PermissionControl,
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['logout']),
    logout() {
      this.logout();
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>