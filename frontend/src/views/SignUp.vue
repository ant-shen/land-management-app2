<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <router-link to="/">Login</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:5001/api/auth/signup', {
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch('login', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
