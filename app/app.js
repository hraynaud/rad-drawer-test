import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./components/Home";
import Login from "./components/Login";
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import { authService } from "./services/auth.service";
import { store } from "./store";
Vue.registerElement(
    "PreviousNextView",
    () => require("nativescript-iqkeyboardmanager").PreviousNextView
);
Vue.use(RadSideDrawer);

Vue.config.silent = TNS_ENV === "production";

new Vue({
    store,
    render(h) {
        return h(App, [
            h(DrawerContent, { slot: "drawerContent" }),
            h(store.getters.loggedIn ? Home : Login, { slot: "mainContent" })
        ]);
    }
}).$start();
