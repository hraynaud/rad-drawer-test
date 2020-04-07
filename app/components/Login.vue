<template>
  <Page actionBarHidden="true" @loaded="checkToken">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/assets/images/logo.png"></Image>
        <Label class="header" text="Konmego"></Label>

        <GridLayout rows="auto, auto, auto">
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
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowspan="3" :busy="loading"></ActivityIndicator>
        </GridLayout>

        <Button
          text="Log In"
          :isEnabled="!loading"
          @tap="submit"
          class="btn btn-primary m-t-20"
        ></Button>
        <Label
          text="Forgot your password?"
          class="login-label"
          @tap="forgotPassword()"
        ></Label>
      </StackLayout>

      <Label class="login-label sign-up-label" @tap="switchToRegister">
        <FormattedString>
          <Span text="Don’t have an account? "></Span>
          <Span text="Sign Up" class="bold"></Span>
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Home from "./Home";
import { authService } from "../services/auth.service";
import Registration from "./Registration";

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      loading: false,
      isLoggingIn: true,
      returnUrl: "",
      error: ""
    };
  },
  methods: {
    checkToken() {
      this.$store.commit("loginFromStorage");
    },
    switchToRegister() {
      this.$navigateTo(Registration, { clearHistory: true });
    },

    submit() {
      if (!this.email || !this.password) {
        this.errorAlert("Please provide both an email address and password.");
        return;
      }

      this.loading = true;
      this.login();
    },

    login() {
      this.loading = true;
      authService
        .login(this.email, this.password)
        .then(() => {
          this.loading = false;
          this.$navigateTo(Home, { clearHistory: true });
        })
        .catch(error => {
          this.loading = false;
          this.errorAlert(error.message);
        });
    },

    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message:
          "Enter the email address you used to register for APP NAME to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(data => {
        if (data.result) {
          this.authService
            .resetPassword(data.text.trim())
            .then(() => {
              this.alert(
                "Your password was successfully reset. Please check your email for instructions on choosing a new password."
              );
            })
            .catch(() => {
              this.errorAlert(
                "Unfortunately, an error occurred resetting your password."
              );
            });
        }
      });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
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
