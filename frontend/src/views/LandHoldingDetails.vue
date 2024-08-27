<template>
  <div>
    <h2>Land Holding Details</h2>
    <form @submit.prevent="updateLandHolding">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="landHolding.name" required />
      </div>
      <div>
        <label for="legalEntity">Legal Entity:</label>
        <input type="text" id="legalEntity" v-model="landHolding.legalEntity" required />
      </div>
      <div>
        <label for="netMineralAcres">Net Mineral Acres:</label>
        <input type="number" id="netMineralAcres" v-model="landHolding.netMineralAcres" required />
      </div>
      <div>
        <label for="mineralOwnerRoyalty">Mineral Owner Royalty (%):</label>
        <input type="number" id="mineralOwnerRoyalty" v-model="landHolding.mineralOwnerRoyalty" required />
      </div>
      <div>
        <label for="sectionName">Section Name:</label>
        <input type="text" id="sectionName" v-model="landHolding.sectionName" required />
      </div>
      <div>
        <label for="titleSource">Title Source:</label>
        <select id="titleSource" v-model="landHolding.titleSource" required>
          <option value="Class A">Class A</option>
          <option value="Class B">Class B</option>
          <option value="Class C">Class C</option>
          <option value="Class D">Class D</option>
        </select>
      </div>
      <button type="submit">Update Land Holding</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      landHolding: {
        name: '',
        legalEntity: '',
        netMineralAcres: '',
        mineralOwnerRoyalty: '',
        sectionName: '',
        titleSource: 'Class A',
      },
    };
  },
  created() {
    this.fetchLandHolding();
  },
  methods: {
    fetchLandHolding() {
      const id = this.$route.params.id;
      fetch(`/api/landholdings/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.landHolding = data;
        })
        .catch((error) => {
          console.error('Error fetching land holding:', error);
        });
    },
    updateLandHolding() {
      const id = this.$route.params.id;
      fetch(`/api/landholdings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.landHolding),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update land holding');
          }
          this.$router.push('/landholdings');
        })
        .catch((error) => {
          console.error('Error updating land holding:', error);
        });
    },
  },
};
</script>
