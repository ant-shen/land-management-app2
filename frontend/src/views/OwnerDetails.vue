<template>
  <div class="owner-details">
    <h2>{{ owner.name }}</h2>
    <p>Address: {{ owner.address }}</p>
    <h3>Land Holdings</h3>
    <ul>
      <li v-for="holding in landHoldings" :key="holding._id">
        {{ holding.name }} ({{ holding.sectionName }})
      </li>
    </ul>
    <form @submit.prevent="createLandHolding">
      <h3>Create New Land Holding</h3>
      <div>
        <label for="legalEntity">Legal Entity:</label>
        <input type="text" v-model="legalEntity" required />
      </div>
      <div>
        <label for="netMineralAcres">Net Mineral Acres:</label>
        <input type="number" v-model="netMineralAcres" required />
      </div>
      <div>
        <label for="mineralOwnerRoyalty">Mineral Owner Royalty (%):</label>
        <input type="number" v-model="mineralOwnerRoyalty" required />
      </div>
      <div>
        <label for="sectionName">Section Name:</label>
        <input type="text" v-model="sectionName" required />
      </div>
      <div>
        <label for="section">Section:</label>
        <input type="text" v-model="section" required />
      </div>
      <div>
        <label for="township">Township:</label>
        <input type="text" v-model="township" required />
      </div>
      <div>
        <label for="range">Range:</label>
        <input type="text" v-model="range" required />
      </div>
      <div>
        <label for="titleSource">Title Source:</label>
        <input type="text" v-model="titleSource" required />
      </div>
      <button type="submit">Create Land Holding</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OwnerDetails',
  data() {
    return {
      owner: {},
      landHoldings: [],
      legalEntity: '',
      netMineralAcres: '',
      mineralOwnerRoyalty: '',
      sectionName: '',
      section: '',
      township: '',
      range: '',
      titleSource: '',
    };
  },
  async created() {
    try {
      const ownerId = this.$route.params.id;
      const ownerResponse = await axios.get(`http://localhost:5000/api/owners/${ownerId}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      });
      this.owner = ownerResponse.data;

      const holdingsResponse = await axios.get(`http://localhost:5000/api/landholdings?owner=${ownerId}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      });
      this.landHoldings = holdingsResponse.data;
    } catch (error) {
      console.error('Failed to fetch owner or land holdings:', error);
      this.$router.push('/dashboard');
    }
  },
  methods: {
    async createLandHolding() {
      try {
        const ownerId = this.$route.params.id;
        const response = await axios.post(
          'http://localhost:5000/api/landholdings',
          {
            name: this.owner.name,
            owner: ownerId,
            legalEntity: this.legalEntity,
            netMineralAcres: this.netMineralAcres,
            mineralOwnerRoyalty: this.mineralOwnerRoyalty,
            sectionName: this.sectionName,
            section: this.section,
            township: this.township,
            range: this.range,
            titleSource: this.titleSource,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        );
        this.landHoldings.push(response.data);
        this.legalEntity = '';
        this.netMineralAcres = '';
        this.mineralOwnerRoyalty = '';
        this.sectionName = '';
        this.section = '';
        this.township = '';
        this.range = '';
        this.titleSource = '';
      } catch (error) {
        console.error('Failed to create land holding:', error);
        alert('Failed to create land holding.');
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
