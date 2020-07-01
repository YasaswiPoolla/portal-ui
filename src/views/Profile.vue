<template>
  <div>
    <b-card>
      <div v-if="user_data">
        <b-avatar :src="url" size="6rem"></b-avatar>
      </div>
      <div v-else>
        <b-avatar
          :src="'http://localhost:8000' + currentUser.profile_image"
          size="6rem"
        ></b-avatar>
      </div>
      <input type="file" @change="onFileChanged" />
      <button @click="onUpload">Upload!</button>
    </b-card>
  </div>
</template>
<script>
import axios from "axios";
import ImageUploadAPI from "&services/ImageUploadAPI";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      selectedFile: null,
      isEditing: false,
      user_data: null,
      url: null
    };
  },
  mounted() {
    if (this.currentUser == null) {
      this.getCurrentUser();
    }
  },
  created() {
    let default_image =
      "http://localhost:8000" + this.currentUser.profile_image;
    this.getCurrentUser();
  },
  computed: {
    ...mapState("user", ["currentUser"])
  },
  methods: {
    ...mapActions("user", ["logout", "getCurrentUser"]),
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    },
    onUpload() {
      // upload file, get it from this.selectedFile
      const formData = new FormData();
      formData.append("datafile", this.selectedFile, this.selectedFile.name);
      let component = this;
      ImageUploadAPI.getProfileImage(formData).then(response => {
        component.user_data = response.data;
        component.url = "http://localhost:8000" + response.data.profile_image;
      });
    }
  }
};
</script>
