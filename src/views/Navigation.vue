<template>
  <div class="main">
    <b-container fluid class="main-container">
      <b-container
        fluid
        class="main-container"
        style="display: flex; height:100%;"
      >
        <sidebar-menu :menu="menu" :collapsed="true" widthCollapsed="45px" />
        <transition name="fade" mode="out-in">
          <router-view
            :key="$route.fullPath"
            class="content-container"
          ></router-view>
        </transition>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import { SidebarMenu } from "vue-sidebar-menu";

export default {
  data() {
    return {
      menu: [
        {
          href: "/home",
          title: "Dashboard",
          icon: "fa fa-user"
        },
        {
          href: "/trips",
          title: "My Trips",
          icon: "fas fa-map-marked-alt"
        },
        {
          href: "/profile",
          title: "My Profile",
          icon: "fas fa-user-circle"
        }
      ]
    };
  },
  components: {
    SidebarMenu
  },
  methods: {}
};
</script>
<style lang="css">
.content-container {
  padding: 10px !important;
  width: 100%;
  overflow-y: scroll;
}
</style>
