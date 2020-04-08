<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/assets/images/logo.png"></Image>
        <Label class="header" text="Konmego"></Label>

        <GridLayout rows="auto, auto, auto, auto, auto,auto,autok">
          <StackLayout row="0" class="input-field">
            <TextField
              class="input"
              hint="Email"
              :isEnabled="!loading"
              keyboardType="email"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="email"
              returnKeyType="next"
              @returnPress="focusPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField
              class="input"
              ref="password"
              :isEnabled="!loading"
              hint="Password"
              secure="true"
              v-model="password"
              returnKeyType="next"
              @returnPress="focusConfirmPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" class="input-field">
            <TextField
              class="input"
              ref="confirmPassword"
              :isEnabled="!loading"
              hint="Confirm password"
              secure="true"
              v-model="confirmPassword"
              returnKeyType="next"
              @returnPress="focusFirstName"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="3" class="input-field">
            <TextField
              class="input"
              ref="firstName"
              :isEnabled="!loading"
              hint="First Name"
              v-model="firstName"
              returnKeyType="next"
              @returnPress="focusLastName"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
          <StackLayout row="4" class="input-field">
            <TextField
              class="input"
              ref="lastName"
              :isEnabled="!loading"
              hint="Last Name"
              v-model="lastName"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowspan="3" :busy="loading"></ActivityIndicator>
        </GridLayout>

        <Button
          text="Sign Up"
          :isEnabled="!loading"
          @tap="submit"
          class="btn btn-primary m-t-20"
        ></Button>
      </StackLayout>

      <Label class="login-label sign-up-label" @tap="switchToLogin">
        <FormattedString>
          <Span text="Already have an account? "></Span>
          <Span text="Login"></Span>
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
}

.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: #d51a1a;
}

.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}

.input:disabled {
  background-color: white;
  opacity: 0.5;
}

.btn-primary {
  margin: 30 5 15 5;
}

.login-label {
  horizontal-align: center;
  color: #a8a8a8;
  font-size: 16;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}
</style>

<script>
import Home from "./Home";
import Login from "./Login";
import { authService } from "../services/auth.service";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: ""
    };
  },
  methods: {
    switchToLogin() {
      this.$navigateTo(Login, { clearHistory: true });
    },

    submit() {
      if (!this.email || !this.password) {
        this.errorAlert("Please provide both an email address and password.");
        return;
      }

      if (this.password != this.confirmPassword) {
        this.errorAlert("Your passwords do not match.");
        this.loading = false;
        return;
      }

      this.loading = true;
      this.register();
    },

    register() {
      authService
        .register(this.email, this.password, this.firstName, this.lastName)
        .then(() => {
          this.loading = false;
          //  this.alert("Your account was successfully created.");
          this.$navigateTo(Home, { clearHistory: true });
        })
        .catch(e => {
          this.loading = false;
          this.errorAlert("We were unable to create your account.");
        });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      this.$refs.confirmPassword.nativeView.focus();
    },
    focusFirstName() {
      this.$refs.firstName.nativeView.focus();
    },
    focusLastName() {
      this.$refs.lastName.nativeView.focus();
    },
    errorAlert(message) {
      return this.alert(message, "Error");
    },
    alert(message, title = "") {
      return alert({
        title: title,
        okButtonText: "OK",
        message: message
      });
    }
  }
};
</script>
