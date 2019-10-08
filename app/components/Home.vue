<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
      -->
      <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
      <!-- 
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
      -->
      <ActionItem
        icon="res://navigation/menu"
        android:visibility="collapsed"
        @tap="onDrawerButtonTap"
        ios.position="left"
      ></ActionItem>
      <Label class="action-bar-title" text="Home"></Label>
    </ActionBar>

    <StackLayout class="page-content">
       <ListView for="p in projects" class="list-group">
          <v-template>
            <StackLayout class="list-group-item">
              <Label :text="p.name" />
            </StackLayout>
          </v-template>
        </ListView>
    </StackLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import { apiService } from "../services/api.service";
import SelectedPageService from "../shared/selected-page-service";

export default {
  data() {
    return {
      projects: []
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
    console.log("!! local IP", LOCAL_IP);
    apiService.get("api/v1/projects").then(
      data => {
        this.projects = data.sort(function(a, b) {
          return a.name > b.name ? 1 : -1;
        });
      },
      error => {
        console.error("!!!!", error);
      }
    );
  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    }
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../app-variables";
// End custom common variables

// Custom styles
</style>