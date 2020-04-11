<template lang="html">
  <GridLayout rows="auto, *" class="sidedrawer sidedrawer-left">
    <StackLayout row="0" class="sidedrawer-header">
      <Label class="sidedrawer-header-image fa" text.decode="&#xf2bd;"></Label>
      <Label class="sidedrawer-header-brand" :text="name"></Label>

      <FlexboxLayout justifyContent="space-between">
        <Label
          width="*"
          class="footnote"
          alignSelf="flex-start"
          text="username@mail.com"
        ></Label>
        <Label
          witdth="30%"
          class="footnote"
          text="Logout"
          @tap="onLogoutTap()"
        ></Label>
      </FlexboxLayout>
    </StackLayout>

    <ScrollView row="1" class="sidedrawer-content">
      <StackLayout>
        <GridLayout
          columns="auto, *"
          :class="
            'sidedrawer-list-item' +
              (selectedPage === 'Home' ? ' selected' : '')
          "
          @tap="onNavigationItemTap(Home)"
        >
          <Label col="0" text.decode="&#xf015;" class="fa"></Label>
          <Label col="1" text="Home" class="p-r-10"></Label>
        </GridLayout>

        <GridLayout
          columns="auto, *"
          :class="
            'sidedrawer-list-item' +
              (selectedPage === 'Browse' ? ' selected' : '')
          "
          @tap="onNavigationItemTap(Browse)"
        >
          <Label col="0" text.decode="&#xf1ea;" class="fa"></Label>
          <Label col="1" text="Browse" class="p-r-10"></Label>
        </GridLayout>

        <GridLayout
          columns="auto, *"
          :class="
            'sidedrawer-list-item' +
              (selectedPage === 'Search' ? ' selected' : '')
          "
          @tap="onNavigationItemTap(Search)"
        >
          <Label col="0" text.decode="&#xf002;" class="fa"></Label>
          <Label col="1" text="Search" class="p-r-10"></Label>
        </GridLayout>

        <GridLayout
          columns="auto, *"
          :class="
            'sidedrawer-list-item' +
              (selectedPage === 'Featured' ? ' selected' : '')
          "
          @tap="onNavigationItemTap(Featured)"
        >
          <Label col="0" text.decode="&#xf005;" class="fa"></Label>
          <Label col="1" text="Featured" class="p-r-10"></Label>
        </GridLayout>

        <GridLayout
          columns="auto, *"
          :class="
            'sidedrawer-list-item' +
              (selectedPage === 'Profile' ? ' selected' : '')
          "
          @tap="onNavigationItemTap(Profile)"
        >
          <Label col="0" text.decode="&#xf005;" class="fa"></Label>
          <Label col="1" text="Profile" class="p-r-10"></Label>
        </GridLayout>

        <StackLayout class="hr-light"></StackLayout>

        <GridLayout
          columns="auto, *"
          :class="
            'sidedrawer-list-item' +
              (selectedPage === 'Settings' ? ' selected' : '')
          "
          @tap="onNavigationItemTap(Settings)"
        >
          <Label col="0" text.decode="&#xf013;" class="fa"></Label>
          <Label col="1" text="Settings" class="p-r-10"></Label>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
import Home from "./Home";
import Login from "./Login";
import Browse from "./Browse";
import Featured from "./Featured";
import Search from "./Search";
import Profile from "./Profile";
import Settings from "./Settings";
import * as utils from "~/shared/utils";
import SelectedPageService from "~/shared/selected-page-service";
import { authService } from "../services/auth.service";

export default {
  mounted() {
    SelectedPageService.getInstance().selectedPage$.subscribe(
      selectedPage => (this.selectedPage = selectedPage)
    );
  },
  data() {
    return {
      Home: Home,
      Browse: Browse,
      Featured: Featured,
      Search: Search,
      Settings: Settings,
      Profile: Profile,
      selectedPage: ""
    };
  },
  components: {
    Home,
    Browse,
    Featured,
    Search,
    Settings,
    Profile
  },
  computed: {
    name() {
      return this.$store.getters.userName;
    }
  },
  methods: {
    onNavigationItemTap(component) {
      this.$navigateTo(component, {
        clearHistory: true
      });
      utils.closeDrawer();
    },
    onLogoutTap() {
      utils.closeDrawer();
      utils.disableDrawer();
      authService.logout();

      this.$navigateTo(Login, {
        clearHistory: true
      });
    }
  }
};
</script>

<style scoped lang="scss">
// Custom common variables
@import "../app-variables";

// Drawer navigation custom styles
$sidedrawer-header-image-size: 60;
$sidedrawer-header-image-offset-top: 20;
$sidedrawer-header-image-offset-bottom: 5;
$sidedrawer-list-item-offset-left: 15;
$sidedrawer-list-icon-offset: 10;
$sidedrawer-list-icon-size: 20;
.sidedrawer {
  &.sidedrawer-left {
    background-color: $ab-background;

    .sidedrawer-header-image {
      color: $background-dark;
      height: $sidedrawer-header-image-size;
      width: $sidedrawer-header-image-size;
      font-size: $sidedrawer-header-image-size;
      padding: 0;
      margin-bottom: $sidedrawer-header-image-offset-bottom;
      margin-top: $sidedrawer-header-image-offset-top;
    }

    .footnote {
      color: rgba($ab-color, 0.5);
    }
  }

  .sidedrawer-header {
    background-color: $ab-background;

    .sidedrawer-header-brand {
      color: $ab-color;
    }
  }

  .sidedrawer-content {
    background-color: $side-drawer-background;
  }

  .sidedrawer-list-item {
    padding-left: $sidedrawer-list-item-offset-left;

    label {
      vertical-align: center;
      color: $blue-dark;
    }

    .fa {
      width: $sidedrawer-list-icon-size;
      margin-right: $sidedrawer-list-icon-offset;
    }

    &.selected {
      background-color: $item-active-background;

      label {
        color: $item-active-color;
      }
    }
  }
}
</style>
