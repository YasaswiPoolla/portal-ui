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
              v-if="isEditing"
              style="margin-top:10px;"
              type="file"
              @change="onFileChanged"
            />
          </b-col>
          <b-col v-if="currentUser">
            <h1>Details:</h1>
            <label for="first_name">First Name:</label>
            <b-form-input
              id="first_name"
              class="form-input"
              ref="first_name"
              :disabled="!isEditing"
              v-model="user.firstName"
              :class="{ view: !isEditing }"
            ></b-form-input>
            <label for="last_name">Last Name:</label>
            <b-form-input
              id="last_name"
              class="form-input"
              :disabled="!isEditing"
              v-model="user.lastName"
              :class="{ view: !isEditing }"
            ></b-form-input>
            <label for="email">Email:</label>
            <b-form-input
              id="email"
              class="form-input"
              :disabled="!email_field"
              v-model="user.email"
            ></b-form-input>
            <label for="mobile">Mobile:</label>
            <b-form-input
              id="mobile"
              class="form-input"
              :disabled="!isEditing"
              v-model="user.mobile"
              :class="{ view: !isEditing }"
            ></b-form-input>
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
                @click="isEditing = !isEditing"
                v-if="!isEditing"
                >EDIT</b-button
              >

              <b-button
                pill
                variant="success"
                style="margin-left:15px;width:150px;"
                @click="isEditing = false"
                v-else-if="isEditing"
                >SAVE</b-button
              >

              <b-button
                pill
                variant="success"
                style="margin-left:15px;width:150px;"
                @click="onUpload"
                >UPDATE</b-button
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
import UserDetailsAPI from "&services/UserDetailsAPI";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      selectedFile: null,
      isEditing: false,
      email_field: false,
      user_data: null,
      url: null,
      user: {
        firstName: "",
        lastName: "",
        mobile: "",
        email: ""
      }
    };
  },
  watch: {
    currentUser: function(val) {
      this.getCurrentUserDetails();
    }
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
    this.getCurrentUserDetails();
  },
  computed: {
    ...mapState("user", ["currentUser"])
  },
  methods: {
    ...mapActions("user", ["logout", "getCurrentUser"]),
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append("datafile", this.selectedFile);
      let component = this;
      ImageUploadAPI.getProfileImage(formData).then(response => {
        component.user_data = response.data;
        component.url = "http://localhost:8000" + response.data.profile_image;
      });
    },
    onUpload() {
      const formData = new FormData();
      formData.append("first_name", this.user["firstName"]);
      formData.append("last_name", this.user["lastName"]);
      formData.append("email", this.user["email"]);
      formData.append("mobile", this.user["mobile"]);
      let component = this;
      UserDetailsAPI.getUserDetails(formData).then(response => {
        alert("successfully updated");
      });
    },
    getCurrentUserDetails() {
      this.user.firstName = this.currentUser.first_name;
      this.user.lastName = this.currentUser.last_name;
      this.user.mobile = this.currentUser.mobile;
      this.user.email = this.currentUser.email;
    }
  }
};
</script>
<style scoped>
.form-input {
  width: 50%;
}
</style>
