<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <button @click="logout">Logout</button>
    
    <!-- Owners List -->
    <div v-if="owners.length > 0">
      <h3>Owners</h3>
      <ul>
        <li v-for="owner in owners" :key="owner._id">
          <router-link :to="'/owner/' + owner._id">{{ owner.ownerName }}</router-link>
          <!-- Delete Button -->
          <button @click="deleteOwner(owner._id)">Delete</button>
        </li>
      </ul>
    </div>
    
    <!-- Create Owner Form -->
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

    <!-- File Upload Form -->
    <form @submit.prevent="uploadFile">
      <h3>Upload File</h3>
      <input type="file" @change="handleFileChange" />
      <button type="submit">Upload File</button>
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
      file: null,
    };
  },
  async created() {
    try {
      const response = await axios.get('${process.env.VUE_APP_API_URL}/api/owners', {
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
          '${process.env.VUE_APP_API_URL}/api/owners',
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
    async deleteOwner(ownerId) {
      try {
        await axios.delete(`https://master--tourmaline-praline-8590d5.netlify.app:5001/api/owners/${ownerId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        });
        this.owners = this.owners.filter(owner => owner._id !== ownerId);
      } catch (error) {
        console.error('Failed to delete owner:', error);
        alert('Failed to delete owner.');
      }
    },
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadFile() {
      if (!this.file) {
        alert('Please select a file to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        await axios.post('${process.env.VUE_APP_API_URL}/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        });
        alert('File uploaded successfully.');
        this.file = null; // Clear the file input after upload
      } catch (error) {
        console.error('Failed to upload file:', error);
        alert('Failed to upload file.');
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
