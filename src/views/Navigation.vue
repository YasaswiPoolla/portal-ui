<template>
  <div class="main">
    <b-container fluid class="main-container">
      <b-container
        fluid
        class="main-container"
        style="display: flex; height:100%;"
      >
        <sidebar-menu
          :menu="menu"
          :collapsed="true"
          :relative="true"
          widthCollapsed="45px"
          @toggle-collapse="onToggleCollapse"
          @item-click="onItemClick"
        />
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
import { mapActions } from "vuex";

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
        },
        {
          // href: "/profile",
          title: "LogOut",
          icon: "fas fa-sign-out-alt"
        }
      ]
    };
  },
  components: {
    SidebarMenu
  },
  mounted() {
    if (this.currentUser == null) {
      this.getCurrentUser();
    }
  },
  methods: {
    ...mapActions("user", ["logout", "getCurrentUser"]),

    logoutClick() {
      let component = this;
      this.logout()
        .then(response => {
          console.log(response);
          component.$router.push("/login");
        })
        .catch(error => {
          console.log(error);
        });
      sessionStorage.removeItem("lastPath");
    },
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    onItemClick(event, item) {
      if (item.title === "LogOut") {
        this.logoutClick();
      }
    }
  }
};
</script>
<style lang="css">
.content-container {
  padding: 10px !important;
  width: 100%;
  overflow-y: scroll;
}
</style>
