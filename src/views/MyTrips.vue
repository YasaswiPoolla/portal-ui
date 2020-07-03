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
      alert("CLicked");
    }
  }
};
</script>
