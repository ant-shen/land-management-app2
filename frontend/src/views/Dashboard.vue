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
          <!-- Edit Button -->
          <button @click="editOwner(owner)">Edit</button>
          <!-- Delete Button -->
          <button @click="deleteOwner(owner._id)">Delete</button>
        </li>
      </ul>
    </div>

    <!-- Create/Update Owner Form -->
    <form @submit.prevent="saveOwner">
      <h3>{{ isEditing ? 'Update' : 'Create' }} Owner</h3>
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
      <button type="submit">{{ isEditing ? 'Update' : 'Create' }} Owner</button>
      <button v-if="isEditing" @click="cancelEdit">Cancel</button>
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
      ownerId: null,
      ownerName: '',
      entityType: 'Company',
      ownerType: 'Competitor',
      address: '',
      isEditing: false, // Track if we are in edit mode
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
    async saveOwner() {
      try {
        if (this.isEditing) {
          // Update existing owner
          const response = await axios.put(
            `http://localhost:5001/api/owners/${this.ownerId}`,
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
          // Update owner in the list
          const index = this.owners.findIndex(owner => owner._id === this.ownerId);
          this.$set(this.owners, index, response.data);
        } else {
          // Create new owner
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
        }
        // Clear form fields
        this.resetForm();
      } catch (error) {
        console.error(this.isEditing ? 'Failed to update owner' : 'Failed to create owner', error);
        alert(this.isEditing ? 'Failed to update owner.' : 'Failed to create owner.');
      }
    },
    editOwner(owner) {
      // Populate the form with the selected owner's data
      this.ownerId = owner._id;
      this.ownerName = owner.ownerName;
      this.entityType = owner.entityType;
      this.ownerType = owner.ownerType;
      this.address = owner.address;
      this.isEditing = true;
    },
    async deleteOwner(ownerId) {
      try {
        await axios.delete(`http://localhost:5001/api/owners/${ownerId}`, {
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
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      // Clear form fields
      this.ownerId = null;
      this.ownerName = '';
      this.entityType = 'Company';
      this.ownerType = 'Competitor';
      this.address = '';
      this.isEditing = false;
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
