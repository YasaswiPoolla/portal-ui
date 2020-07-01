import Vue from "vue";

export async function handleExpiredSession() {
  console.log("EXPIRED SESSION");
}

export async function handleTimeout() {
  let callback = () =>
    Vue.toasted.show("Request timed out.", {
      theme: "toasted-primary",
      position: "bottom-center",
      duration: 5000
    });
  callback();
}
