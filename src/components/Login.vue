<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions(['loginUser']),
    async login() {
      try {
        await this.loginUser({ username: this.username, password: this.password });
        this.$router.push({ name: 'Dashboard' });
      } catch (error) {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
}
.error {
  color: red;
}
</style>