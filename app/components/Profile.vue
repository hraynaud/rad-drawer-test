<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
      <NavigationButton
        ios:visibility="collapsed"
        icon="res://menu"
        @tap="onDrawerButtonTap"
      ></NavigationButton>
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
      >
      </ActionItem>
      <Label class="action-bar-title" text="Featured"></Label>
    </ActionBar>

    <!--GridLayout class="page-content">
            <Label class="page-icon fa" text.decode="&#xf005;"></Label>
            <Label class="page-placeholder" :text="message"></Label>
        </GridLayout-->
    <StackLayout ~mainContent>
      <DockLayout>
        <StackLayout dock="top" height="90%" width="100%" style="">
          <ScrollView>
            <StackLayout style="font-size:18;">
              <StackLayout alignItems="center">
                <Image
                  src="~/assets/images/profilepic.png"
                  stretch="aspectFill"
                  class="profilePic"
                >
                </Image>
                <Label
                  text="Aurora Mary"
                  color="#000"
                  fontSize="19"
                  fontWeight="bold"
                  textAlignment="center"
                />
                <StackLayout class="aboutContainer">
                  <StackLayout orientation="horizontal">
                    <Label
                      text=""
                      style="font-size:18;color:#557AAD;"
                      class="font-awesome"
                    />
                    <Label
                      text="New York"
                      style="font-size:16;color:#000;margin-left:9;margin-top:1;"
                      class="font-awesome"
                    />
                  </StackLayout>
                  <StackLayout orientation="horizontal" class="aboutRow">
                    <Label
                      text=""
                      style="font-size:16;color:#557AAD;"
                      class="font-awesome"
                    />
                    <Label
                      text="Website.com"
                      style="font-size:16;color:#000;margin-left:6;"
                      class="font-awesome"
                    />
                  </StackLayout>
                </StackLayout>
                <StackLayout
                  orientation="horizontal"
                  class="followersContainer"
                >
                  <StackLayout width="33%">
                    <Label text="6" class="followersTxtValue" />
                    <Label text="Posts " class="followersTxt" />
                  </StackLayout>
                  <StackLayout width="33%">
                    <Label text="2300" class="followersTxtValue" />
                    <Label text="Followers " class="followersTxt" />
                  </StackLayout>
                  <StackLayout width="33%">
                    <Label text="400" class="followersTxtValue" />
                    <Label text="Following " class="followersTxt" />
                  </StackLayout>
                </StackLayout>
              </StackLayout>

              <WrapLayout
                alignItems="left"
                backgroundColor="#eeeeee"
                marginTop="10"
              >
                <Image
                  src="~/assets/images/New-York.jpg"
                  stretch="aspectFill"
                  class="listImage"
                  width="33.3%"
                  height="140"
                />
                <Image
                  src="~/assets/images/ny2.jpg"
                  stretch="aspectFill"
                  class="listImage"
                  width="33.3%"
                  height="140"
                />
                <Image
                  src="~/assets/images/food.jpg"
                  stretch="aspectFill"
                  class="listImage"
                  width="33.3%"
                  height="140"
                />
                <Image
                  src="~/assets/images/wedding.jpg"
                  stretch="aspectFill"
                  class="listImage"
                  width="33.3%"
                  height="140"
                />
                <Image
                  src="~/assets/images/Selfie.jpg"
                  stretch="aspectFill"
                  class="listImage"
                  width="33.3%"
                  height="140"
                />
                <Image
                  src="~/assets/images/nature.jpg"
                  stretch="aspectFill"
                  class="listImage"
                  width="33.3%"
                  height="140"
                />
              </WrapLayout>
            </StackLayout>
          </ScrollView>
        </StackLayout>

        <StackLayout
          dock="bottom"
          height="10%"
          style="border-color:#E4E4E4;border-width:1;background:#fff;"
        >
          <StackLayout orientation="horizontal">
            <StackLayout class="navItem" @tap="homeTap()">
              <Label
                text=""
                android:class="notificationAndroid"
                ios:class="notification"
                opacity="0"
              />
              <Label
                text=""
                android:style="font-size:25;margin-top:-15"
                ios:style="font-size:30;margin-top:-15"
                class="font-awesome"
              />
            </StackLayout>
            <StackLayout class="navItem" @tap="profileTap()">
              <Label
                text=""
                android:class="notificationAndroid"
                ios:class="notification"
                opacity="0"
              />
              <Label
                text=""
                :color="mainColor"
                android:style="font-size:25;margin-top:-15"
                ios:style="font-size:30;margin-top:-15"
                class="font-awesome"
              />
            </StackLayout>
            <StackLayout class="navItem" @tap="conversationsTap()">
              <Label
                text="1"
                android:class="notificationAndroid"
                ios:class="notification"
              />
              <Label
                text=""
                android:style="font-size:25;margin-top:-15"
                ios:style="font-size:30;margin-top:-15"
                class="font-awesome"
              />
            </StackLayout>
            <StackLayout class="navItem" @tap="notificationsTap()">
              <Label
                text="0"
                android:class="notificationAndroid"
                ios:class="notification"
                opacity="0"
              />
              <Label
                text=""
                android:style="font-size:23;margin-top:-15"
                ios:style="font-size:29;margin-top:-15"
                class="font-awesome"
              />
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </DockLayout>
    </StackLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import SelectedPageService from "../shared/selected-page-service";

export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Profile");
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
