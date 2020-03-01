<template>
  <Page class="page" @loaded="pageLoaded">
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
      <Label class="action-bar-title" text="Browse"></Label>
    </ActionBar>

    <GridLayout rows="auto,*" backgroundColor="#3c495e">
      <StackLayout row="0">
        <Label text="Search" col="0"></Label>
        <TextField
          v-model="searchValue"
          hint="Enter text..."
          @returnPress="onSearch"
          row="0"
          col="1"
        />
      </StackLayout>
      <WebView id="graph2" ref="graph2" row="1" />
    </GridLayout>
  </Page>
</template>


<script>
import * as utils from "~/shared/utils";
import SelectedPageService from "../shared/selected-page-service";
import { apiService } from "../services/api.service";

import { WebView } from "tns-core-modules/ui/web-view";
import { EventData } from "tns-core-modules/data/observable";
import { WebViewUtils } from "nativescript-webview-utils";

let webView;
const headers = new Map();

export default {
  data() {
    return {
      searchValue: ""
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Browse");
    this.searchValue = "Cooking";
  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    }
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    apiTopicSearchPath() {
      return `${apiService.serverUrl()}/api/v1/topic_contacts`;
    },
    onSearch(){
      this.loadWebview();
      webView.reload();
    },
    loadWebview() {
      headers.set("X-Custom-Header-Topic", this.searchValue);
      WebViewUtils.addHeaders(webView, headers);
      webView.src = this.apiTopicSearhPath();
    },
    pageLoaded(args) {
      let p = args.object;
      webView = p.getViewById("graph2");
      this.loadWebview();
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