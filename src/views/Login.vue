<template>
  <div class="main-background">
    <b-card style="max-width: 25rem;opacity:0.8" class="mb-2">
      <div class="box">
        <div class="inner-box">
          <div class="d-flex justify-content-center">
            <h1>Login</h1>
          </div>
          <b-form class="form-class" @submit.prevent="handleSubmit">
            <b-form-input
              class="input"
              :class="{ 'is-invalid': submitted && $v.user.email.$error }"
              id="email"
              type="email"
              v-model="user.email"
              placeholder="Enter Email"
            ></b-form-input>
            <div
              v-if="submitted && $v.user.email.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.email.required">Email is required</span>
              <span v-if="!$v.user.email.email">Email is invalid</span>
            </div>
            <b-form-input
              class="input"
              v-model="user.password"
              :class="{ 'is-invalid': submitted && $v.user.password.$error }"
              id="password"
              type="password"
              placeholder="Enter Password"
            ></b-form-input>
            <div
              v-if="submitted && $v.user.password.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.password.required"
                >Password is required</span
              >
            </div>
            <!-- <div class="d-flex justify-content-center">
              <span class="backend_error_message">{{ backendErrorMessage }}</span>
            </div> -->
            <b-button class="btn" block variant="info" type="submit"
              >Login</b-button
            >
          </b-form>
          <hr />
          <b-row>
            <b-col
              ><b-link class="link" to="reset-password"
                >Forgot Password ?</b-link
              ></b-col
            >
            <b-col style="text-align:right;color:white;"
              ><b-link class="link" to="register">Register Here</b-link></b-col
            >
          </b-row>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        backendErrorMessage: null
      },
      submitted: false
    };
  },
  mounted() {
    let component = this;
    this.getCurrentUser()
      .then(user => {
        component.$router.push("/home");
        // loader.hide();
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapState("user", ["currentUser"])
  },
  validations: {
    user: {
      password: { required },
      email: { required, email }
    }
  },
  methods: {
    ...mapActions("user", ["login", "getCurrentUser"]),
    handleSubmit() {
      // this.backendErrorMessage = null;
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let newUser = {
        email: this.user["email"],
        password: this.user["password"]
      };
      let component = this;
      this.login(newUser).then(() => {
        this.getCurrentUser()

          .then(user => {
            // component.$router.push("/admin-home/dashboard/");
            console.log(user);
            component.$router.push("/home");
          })
          .catch(error => {
            console.log(error);
            // loader.hide();
            // component.backendErrorMessage =
            //   "Unknown error occured. Please contact admin.";
          });
      });
      // .catch(error => {
      //   // loader.hide();
      //   if (error.response.status === 500) {
      //     component.backendErrorMessage =
      //       "Unknown error occured. Please contact admin.";
      //   } else {
      //     component.backendErrorMessage = error.response.data[0];
      //     console.log(component.backendErrorMessage, "!!!");
      //   }
      // });
    }
  }
};
</script>
<style>
.form-class {
  margin-top: 20px;
}
.input {
  margin: 20px 0;
}
.inner-box {
  padding: 30px;
}
.link {
  color: black;
  text-decoration: none !important;
}
.link:hover {
  color: grey;
}

.box {
  background: transparent;
  width: 350px;
  font-size: 12px;
  font-weight: 500;
  position: relative;
}
.btn {
  background: #352f30;
  margin: 15px 0px;
  border: none !important;
}
</style>
