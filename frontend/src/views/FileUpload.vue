<template>
  <div>
    <h2>Upload File</h2>
    <form @submit.prevent="uploadFile">
      <input type="file" ref="fileInput" />
      <button type="submit">Upload</button>
    </form>
    <div v-if="filePath">
      <h3>Uploaded File:</h3>
      <a :href="filePath" target="_blank">View File</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filePath: ''
    };
  },
  methods: {
    async uploadFile() {
      const fileInput = this.$refs.fileInput;
      if (!fileInput.files.length) {
        return alert('Please select a file');
      }

      const formData = new FormData();
      formData.append('file', fileInput.files[0]);

      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/upload/owner/${this.$route.params.id}`, {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        this.filePath = result.filePath;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }
};
</script>
