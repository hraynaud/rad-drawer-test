import Vue from "nativescript-vue";
import Vuex from "vuex";
import { SESSION_USER_KEY, SESSION_AUTH_KEY } from "../services/constants";
const appSettings = require("application-settings");
import * as utils from "~/shared/utils";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loggedIn: false,
        user: null
    },
    mutations: {
        setLoggedInState(state, user) {
            state.loggedIn = true;
            state.user = user;
        },
        setLoggedOutState(state, {}) {
            state.loggedIn = false;
            state.user = null;
        },
        setCurrentUser(state, user) {
            state.user = user;
        },
        loginFromStorage(state, payload) {
            if (
                appSettings.getString(SESSION_AUTH_KEY) &&
                appSettings.getString(SESSION_USER_KEY)
            ) {
                state.user = JSON.parse(
                    appSettings.getString(SESSION_USER_KEY)
                );
                state.loggedIn = true;
            }
            return state.loggedIn;
        }
    },
    actions: {
        logout({ commit }) {
            appSettings.remove(SESSION_USER_KEY);
            appSettings.remove(SESSION_AUTH_KEY);
            commit("setLoggedOutState", {});
        },

        login(context, { token, user }) {
            appSettings.setString(SESSION_AUTH_KEY, token);
            appSettings.setString(SESSION_USER_KEY, JSON.stringify(user));
            context.commit("setLoggedInState", user);
        }
    },
    getters: {
        isLoggedIn: state => state.loggedIn,
        user: state => state.user,
        userName: state => (state.user ? state.user.name : "")
    }
});
