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
    <b-card style="margin-top:40px;padding:10px;">
      <div v-if="show_week_chart">
        <apexchart
          height="300"
          type="line"
          :options="trip_chartOptions"
          :series="trip_series"
        ></apexchart>
      </div>
    </b-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import HomePageGraphsAPI from "&services/HomePageGraphsAPI";
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
      show_week_chart: false,
      trip_chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
          background: "lightgrey",
          height: 350,
          id: "vuechart-example",
          zoom: {
            enabled: false
          }
        },
        labels: [],
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: "#000",
          width: 0.5,
          dashArray: 0
        },
        title: {
          text: "Trips by Week",
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#263238"
          }
        },
        grid: {
          row: {
            colors: ["transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [],
          title: {
            text: "Week"
          },
          axisBorder: {
            show: true,
            color: "grey",
            height: 1,
            width: "100%"
          }
        },
        yaxis: {
          title: {
            text: "Trips"
          },
          axisBorder: {
            show: true,
            color: "grey",
            height: 1
          }
        }
      },
      trip_series: [
        {
          name: "Trips",
          // data: [2, 4, 3, 6]
          data: []
        }
      ]
    };
  },
  mounted() {
    if (this.currentUser != null) {
      this.getWeekTripsCount();
    }
  },
  computed: {
    ...mapState("user", ["currentUser"])
  },
  watch: {
    currentUser: function(val) {
      this.getWeekTripsCount();
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    getWeekTripsCount() {
      let component = this;
      // let loader = this.$loading.show(FULL_PAGE_LOADER_CONFIG);
      HomePageGraphsAPI.getTripsCountByWeek()
        .then(response => {
          // loader.hide();
          console.log(response.data);
          let trip_series = component.trip_series;
          let trip_chartOptions = component.trip_chartOptions;
          for (let key in response.data) {
            trip_series[0].data.push(response.data[key]);
            trip_chartOptions.labels.push(key);
          }
          component.trip_series = trip_series;
          component.trip_chartOptions = trip_chartOptions;
          component.show_week_chart = true;
        })
        .catch(() => {
          // loader.hide();
        });
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
