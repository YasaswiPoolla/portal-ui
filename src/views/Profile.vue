<template>
  <div>
    <b-card class="mb-2">
      <b-container>
        <b-row>
          <b-col cols="3">
            <div v-if="user_data">
              <b-avatar :src="url" size="10rem"></b-avatar>
            </div>
            <div v-else>
              <b-avatar
                :src="'http://localhost:8000' + currentUser.profile_image"
                size="10rem"
              ></b-avatar>
            </div>
            <input
              style="margin-top:10px;"
              type="file"
              @change="onFileChanged"
            />
          </b-col>
          <b-col>
            <h1>Details:</h1>
            <label for="first_name">First Name:</label>
            <b-form-input id="first_name" class="form-input"></b-form-input>
            <label for="last_name">Last Name:</label>
            <b-form-input id="last_name" class="form-input"></b-form-input>
            <label for="email">Email:</label>
            <b-form-input id="email" class="form-input"></b-form-input>
            <label for="mobile">Mobile:</label>
            <b-form-input id="mobile" class="form-input"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3"></b-col>
          <b-col>
            <b-row style="margin-top:20px;">
              <b-button
                pill
                variant="success"
                style="margin-left:15px;width:150px;"
                @click="onUpload"
                >SAVE</b-button
              >
            </b-row>
          </b-col>
        </b-row>
      </b-container>
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
<style scoped>
.form-input {
  width: 50%;
}
</style>
