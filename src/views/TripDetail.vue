<template>
  <div>
    <b-card
      overlay
      img-src="https://picsum.photos/900/250/?image=3"
      img-alt="Card Image"
      text-variant="white"
      title="Trip Details"
    >
      <p>
        <strong>Fron : </strong><span> {{ data.from_location }}</span>
      </p>
      <p>
        <strong>To : </strong><span> {{ data.to_location }}</span>
      </p>
      <p>
        <strong>Date of Journey : </strong><span> {{ data.trip_date }}</span>
      </p>
      <p><strong>Total Distance : </strong></p>
    </b-card>
    <div class="btn">
      <input
        type="file"
        id="files"
        ref="files"
        multiple
        v-on:change="handleFilesUpload()"
        style="display: none"
      />
      <b-button variant="outline-info" @click="$refs.files.click()"
        >Select Images</b-button
      >
    </div>
    <div class="btn">
      <b-button variant="info" v-on:click="submitFiles()">Submit</b-button>
    </div>
    <div style="float:right" class="btn">
      <b-button variant="success" v-on:click="getImages()"
        >View Images</b-button
      >
    </div>
    <b-container>
      <b-row v-for="i in Math.ceil(images_list.length / 3)" :key="i">
        <b-col
          v-for="item in images_list.slice((i - 1) * 3, i * 3)"
          :key="item.images_sqn"
        >
          <br />
          <b-img
            :src="'http://localhost:8000' + item.images"
            width="300px;"
            height="300px;"
          ></b-img>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import TripImagesAPI from "&services/TripImagesAPI";
export default {
  data() {
    return {
      data: null,
      files: "",
      images_list: []
    };
  },
  created() {
    this.data = {
      from_location: this.$route.params.from_location,
      to_location: this.$route.params.to_location,
      trip_date: this.$route.params.trip_date
    };
    this.getImages();
  },
  methods: {
    triggerClick() {
      // Some code here...
    },
    handleFilesUpload() {
      this.files = this.$refs.files.files;
    },
    submitFiles() {
      let formData = new FormData();
      formData.append("from_location", this.data.from_location);
      formData.append("to_location", this.data.to_location);
      formData.append(
        "trip_date",
        this.data.trip_date
          .split(" ")[0]
          .split("-")
          .reverse()
          .join("-")
      );
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files", file);
      }
      let component = this;
      TripImagesAPI.insertImages(formData).then(response => {
        if (response.data.message == "success") {
          alert("Successfully Updated");
        }
      });
    },
    getImages() {
      let formData = new FormData();
      formData.append("from_location", this.data.from_location);
      formData.append("to_location", this.data.to_location);
      formData.append(
        "trip_date",
        this.data.trip_date
          .split(" ")[0]
          .split("-")
          .reverse()
          .join("-")
      );
      let component = this;
      TripImagesAPI.getImages(formData).then(response => {
        component.images_list = response.data;
      });
    }
  }
};
</script>
<style scoped>
.btn {
  margin-top: 10px;
}
</style>
