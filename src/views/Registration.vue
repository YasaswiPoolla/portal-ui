<template>
  <div class="main-background">
    <div class="box">
      <div class="inner-box">
        <div class="d-flex justify-content-center">
          <p>Registration</p>
        </div>
        <hr />
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              v-model="user.firstName"
              id="firstName"
              name="firstName"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.user.firstName.$error }"
            />
            <div
              v-if="submitted && !$v.user.firstName.required"
              class="invalid-feedback"
            >
              First Name is required
            </div>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              v-model="user.lastName"
              id="lastName"
              name="lastName"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.user.lastName.$error }"
            />
            <div
              v-if="submitted && !$v.user.lastName.required"
              class="invalid-feedback"
            >
              Last Name is required
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="user.email"
              id="email"
              name="email"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.user.email.$error }"
            />
            <div
              v-if="submitted && $v.user.email.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.email.required">Email is required</span>
              <span v-if="!$v.user.email.email">Email is invalid</span>
            </div>
          </div>
          <div class="form-group">
            <label for="mobile">Mobile Number</label>
            <input
              type="text"
              v-model="user.mobile"
              id="mobile"
              name="mobile"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.user.mobile.$error }"
            />
            <div
              v-if="submitted && !$v.user.mobile.required"
              class="invalid-feedback"
            >
              Mobile Number is required
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="user.password"
              id="password"
              name="password"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.user.password.$error }"
            />
            <div
              v-if="submitted && $v.user.password.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.password.required"
                >Password is required</span
              >
              <br />
              <span v-if="!$v.user.password.strongPassword"
                >Password need to have a small letter,a capital letter, a
                number, a special character, and be more than 8 characters
                long.</span
              >
            </div>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              v-model="user.confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              class="form-control"
              :class="{
                'is-invalid': submitted && $v.user.confirmPassword.$error
              }"
            />
            <div
              v-if="submitted && $v.user.confirmPassword.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.confirmPassword.required"
                >Confirm Password is required</span
              >
              <span v-else-if="!$v.user.confirmPassword.sameAsPassword"
                >Passwords must match</span
              >
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <span class="backend_error_message">{{ backendErrorMessage }}</span>
          </div>
          <div class="form-row text-center">
            <div class="col-12">
              <button type="submit" class="btn btn-primary">Register</button>
            </div>
          </div>
          <span
            >Go back to
            <br />
            <a href="/login"> Login Page. </a>
          </span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
import RegistrationAPI from "&services/RegistrationAPI";
export default {
  name: "app",
  data() {
    return {
      backendErrorMessage: null,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
      },
      submitted: false
    };
  },
  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      mobile: { required },
      password: {
        required,
        strongPassword(password) {
          return (
            /[a-z]/.test(password) && // checks for a-z
            /[A-Z]+/.test(password) && // checks for capital alphabet
            /[0-9]/.test(password) && // checks for 0-9
            /\W|_/.test(password) && // checks for special char
            password.length >= 6
          );
        }
      },
      confirmPassword: { required, sameAsPassword: sameAs("password") }
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      // let loader = this.$loading.show(FULL_PAGE_LOADER_CONFIG);

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let component = this;
      // let data = {
      //   firstName: this.user["firstName"],
      //   password: this.user["password"],
      //   confirmPassword: this.user["confirmPassword"],
      //   mobile: this.user["mobile"],
      //   email: this.user["email"],
      //   lastName: this.user["lastName"]
      // };
      RegistrationAPI.createUser(this.user).then(response => {
        if (response.data.message === "success") {
          component.$router.push("/login");
        }
      });
    }
  }
};
</script>
<style scoped>
.backend_error_message {
  color: red;
  font-size: 12px;
}
.error_message {
  color: red;
  font-size: 12px;
}
.links {
  margin-top: 10px;
}

.form-class {
  margin-top: 30px;
}

.inner-box {
  padding: 20px;
}

.link {
  text-decoration: none !important;
}
.input {
  margin: 15px 0;
}

.box {
  background: #f7f7f7;
  width: 350px;
  font-size: 12px;
  font-weight: 500;
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
