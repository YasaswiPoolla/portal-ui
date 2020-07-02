<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        class="MyCustomClass"
        v-for="(item, i) in carouselItems"
        :key="i"
        :img-src="item.src"
      ></b-carousel-slide>
    </b-carousel>
    <b-card style="max-width: 80%; margin:auto;margin-top:40px;">
      <div>
        <apexchart
          height="300"
          type="line"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carouselItems: [
        {
          src: require("../assets/carousel/img1.jpg")
        },
        {
          src: require("../assets/carousel/img2.jpg")
        },
        {
          src: require("../assets/carousel/img3.jpg")
        }
      ],
      slide: 0,
      sliding: null,
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 54, 35, 45]
        }
      ],
      chartOptions: {
        chart: {
          height: 150,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Product Trends by Month",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        }
      }
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>
<style scoped>
.MyCustomClass {
  width: 100%;
  height: 500px;
  object-fit: cover;
}
.content-container {
  padding: 0 !important;
}
</style>
