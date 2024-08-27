<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5001/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch('login', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
