<template lang="html">
  <RadSideDrawer
    ref="drawer"
    drawerLocation="Left"
    :gesturesEnabled="isEnabled()"
    :drawerTransition="transition"
  >
    <StackLayout ~drawerContent backgroundColor="#ffffff">
      <slot name="drawerContent"></slot>
    </StackLayout>
    <Frame ~mainContent ref="drawerMainContent">
      <slot name="mainContent"></slot>
    </Frame>
  </RadSideDrawer>
</template>

<script>
import { SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { authService } from "../services/auth.service";

export default {
  data() {
    return {
      transition: new SlideInOnTopTransition()
    };
  },
  methods: {
    isEnabled: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>

<style lang="css"></style>
