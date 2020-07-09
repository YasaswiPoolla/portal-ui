<template>
  <BaseTable
    title="My Trips"
    :APIClass="apiClass"
    :download="false"
    :onRowSelect="onRowClick"
    :initialColumnFilters="initialColumnFilters"
  />
</template>
<script>
import { TripListAPI } from "&services/TripListAPI";
import BaseTable from "&views/BaseTable";

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      apiClass: TripListAPI
    };
  },
  computed: {
    initialColumnFilters() {
      if (this.$route.params.status != null) {
        return {
          ticket_status: [this.$route.params.status]
        };
      } else {
        return {};
      }
    }
  },
  methods: {
    onRowClick(params) {
      let from_location = params.row.from_location;
      let to_location = params.row.to_location;
      let trip_date = params.row.trip_date;
      console.log(from_location, to_location, trip_date);
      this.$router.push(
        "/trip-detail/" + from_location + "/" + to_location + "/" + trip_date
      );
    }
  }
};
</script>
