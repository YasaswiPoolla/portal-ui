<template>
  <div>
    <h3>{{ title }}</h3>
    <br />
    <b-row v-if="showFilters">
      <b-col v-for="column in filterColumns" :key="column.id" sm="3">
        <div v-if="column.type === 'date'">
          <flat-pickr
            v-model="selectedFilters[column.field]"
            :config="flatPickerConfig"
            autocomplete="off"
            @on-close="onDateFilterClose"
            :name="column.field"
            :id="column.field"
            :placeholder="column.label"
            class="form-control"
          />
        </div>
        <div v-else>
          <input
            class="form-control"
            v-model="selectedFilters[column.field]"
            :placeholder="column.label"
            :name="column.field"
            :id="column.field"
            @keyup="onFilterKeyUp"
          />
        </div>
        <br />
      </b-col>
      <b-col sm="3" v-if="filterColumns && filterColumns.length > 0">
        <b-button
          variant="outline-primary"
          class="form-control"
          v-on:click="clearFilters"
          >Clear Filters</b-button
        >
      </b-col>
    </b-row>
    <vue-good-table
      v-if="showTable"
      mode="remote"
      :ref="tableRef"
      :columns="tableColumns"
      :rows="rows"
      :totalRows="count"
      :pagination-options="paginationOptions"
      styleClass="vgt-table condensed"
      @on-row-click="onRowClick"
      @on-page-change="onPageChange"
      @on-sort-change="onSortChange"
      @on-per-page-change="onPerPageChange"
      @on-selected-rows-change="onSelectionChanged"
      :select-options="selectOptions"
    >
    </vue-good-table>
  </div>
</template>

<script>
// import { FULL_PAGE_LOADER_CONFIG, ROLES } from "&helpers/constants";
import flatPickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "BaseTable",
  props: {
    title: { type: String, required: true },
    tableRef: { type: String, default: "baseTable" },
    APIClass: { type: Function, required: true },
    showTable: { type: Boolean, default: true },
    onColumnFilterChange: { type: Function },
    onRowSelect: { type: Function },
    initialColumnFilters: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selectOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selectedRowActionTitle: { type: String, default: null },
    selectedRowsActionClick: { type: Function },
    onSelectionChanged: { type: Function, default: () => {} },
    onColumnsLoaded: { type: Function, default: () => {} }
  },
  data() {
    return {
      components: {
        flatPickr
      },
      flatPickerConfig: {
        mode: "range",
        dateFormat: "d-m-Y",
        allowInput: true,
        maxDate: moment().format("DD-MM-YYYY")
      },
      selectedFilters: this.initialColumnFilters,
      paginationOptions: {
        enabled: true,
        mode: "pages",
        perPage: 10,
        dropdownAllowAll: false
      },
      serverParams: {
        columnFilters: this.initialColumnFilters,
        sort: [],
        page: 1,
        perPage: 10
      },
      columns: [],
      rows: [],
      count: 0,
      graphData: [],
      aggGraphData: [],
      filterClicked: null
    };
  },
  mounted() {
    if (this.currentUser != null) {
      if (this.showTable) {
        this.filterClicked = true;
      }
    }
  },
  computed: {
    ...mapState("user", ["currentUser"]),
    showFilters() {
      if (this.filterClicked === true) {
        return true;
      } else {
        return false;
      }
    },
    filterColumns() {
      let columns = [];
      this.columns.forEach((column, index, new_columns) => {
        if (
          column.filterOptions !== undefined &&
          column.filterOptions.enabled
        ) {
          columns.push(column);
        }
      });
      return columns;
    },
    tableColumns() {
      let columns = [];
      this.columns.forEach((column, index, new_columns) => {
        if (column.filter_only === false) {
          let new_column = Object.assign({}, column);
          delete new_column.filterOptions;
          columns.push(new_column);
        }
      });
      return columns;
    }
  },
  watch: {
    currentUser: function(val) {
      if (this.showTable) {
        this.filterClicked = true;
      }
    },
    filterClicked: function(val) {
      if (val) {
        if (this.columns.length > 0) {
          return;
        }
        this.getColumns();
      }
    }
  },
  methods: {
    ...mapActions("user", ["inspectToken", "logout"]),
    onFilterKeyUp(event) {
      if (event.keyCode === 13) {
        this.onColumnFilter({ columnFilters: this.selectedFilters });
      }
    },
    onDateFilterClose(selectedDates, dateStr, instance) {
      let component = this;
      let columnFilters = Object.assign(
        {},
        component.serverParams.columnFilters
      );
      columnFilters[instance.input.id] = dateStr;
      component.onColumnFilter({ columnFilters: columnFilters });
    },
    clearFilters() {
      this.selectedFilters = {};
      this.onColumnFilter({
        columnFilters: {}
      });
    },
    checkSession() {
      let component = this;
      this.inspectToken()
        .then(() => {})
        .catch(() => {
          component.logout();
          component.$router.push("/login");
        });
    },
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
      this.checkSession();
      this.getColumns();
    },
    onPageChange(params) {
      this.updateParams({
        page: params.currentPage
      });
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage });
    },

    onSortChange(params) {
      this.updateParams({
        sort: params
      });
    },

    onColumnFilter(params) {
      this.updateParams(params);
      if (this.onColumnFilterChange) {
        this.onColumnFilterChange(params);
      }
    },

    onRowClick(params) {
      if (this.onRowSelect) {
        this.onRowSelect(params);
      }
    },

    getData() {
      if (!this.showTable) {
        return;
      }
      // let loader = this.$loading.show(FULL_PAGE_LOADER_CONFIG);
      let component = this;
      this.APIClass.getData(this.serverParams)
        .then(response => {
          // loader.hide();
          component.rows = response.data.rows;
          component.count = response.data.count;
        })
        .catch(() => {
          // loader.hide();
        });
    },
    getColumns() {
      // let loader = this.$loading.show(FULL_PAGE_LOADER_CONFIG);
      let component = this;
      this.APIClass.getColumns(component.serverParams)
        .then(response => {
          // loader.hide();
          component.columns = response.data;
          component.getData();
          component.getGraphData();
          component.onColumnsLoaded();
        })
        .catch(() => {
          // loader.hide();
        });
    }
  }
};
</script>

<style scoped>
.form-control {
  min-height: 43px;
  font-size: 14px;
}
</style>
