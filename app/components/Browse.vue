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

    <GridLayout class="page-content">
      <Label class="page-icon fa" text.decode="&#xf1ea;"></Label>
      <Label class="page-placeholder" :text="message"></Label>
      <WebView height="230" width="350" id="graph2" ref="graph2" />
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

export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Browse");
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
    apiTopicSearhPath() {
      return `${apiService.baseUrl()}/graph2.html`;
    },
    pageLoaded(args) {
      let p = args.object;
      let webView = p.getViewById("graph2");
      const headers = new Map();
      headers.set("Foo", "Bar :P");
      headers.set("X-Custom-Header", "Set at " + new Date().toTimeString());
      WebViewUtils.addHeaders(webView, headers);
      webView.src = this.apiTopicSearhPath();
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