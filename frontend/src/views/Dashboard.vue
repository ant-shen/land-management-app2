<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <button @click="logout">Logout</button>
    <div v-if="owners.length > 0">
      <h3>Owners</h3>
      <ul>
        <li v-for="owner in owners" :key="owner._id">{{ owner.ownerName }}
          <!-- This line is commented out <router-link :to="'/owner/' + owner._id">{{ owner.name }}</router-link>-->
        </li>
      </ul>
    </div>
    <form @submit.prevent="createOwner">
      <h3>Create New Owner</h3>
      <div>
        <label for="ownerName">Owner Name:</label>
        <input type="text" v-model="ownerName" required />
      </div>
      <div>
        <label for="entityType">Entity Type:</label>
        <select v-model="entityType" required>
          <option value="Company">Company</option>
          <option value="Individual">Individual</option>
          <option value="Investor">Investor</option>
          <option value="Trust">Trust</option>
        </select>
      </div>
      <div>
        <label for="ownerType">Owner Type:</label>
        <select v-model="ownerType" required>
          <option value="Competitor">Competitor</option>
          <option value="Seller">Seller</option>
          <option value="Investor">Investor</option>
          <option value="Professional">Professional</option>
        </select>
      </div>
      <div>
        <label for="address">Address:</label>
        <input type="text" v-model="address" required />
      </div>
      <button type="submit">Create Owner</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
    return {
      owners: [],
      ownerName: '',
      entityType: 'Company',
      ownerType: 'Competitor',
      address: '',
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5001/api/owners', {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      });
      this.owners = response.data;
    } catch (error) {
      console.error('Failed to fetch owners:', error);
      this.$router.push('/');
    }
  },
  methods: {
    async createOwner() {
      try {
        const response = await axios.post(
          'http://localhost:5001/api/owners',
          {
            ownerName: this.ownerName,
            entityType: this.entityType,
            ownerType: this.ownerType,
            address: this.address,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        );
        this.owners.push(response.data);
        this.ownerName = '';
        this.entityType = 'Company';
        this.ownerType = 'Competitor';
        this.address = '';
      } catch (error) {
        console.error('Failed to create owner:', error);
        alert('Failed to create owner.');
      }
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
