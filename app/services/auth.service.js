
import nodeify from 'nativescript-nodeify';
import jwt from 'jsonwebtoken';
import { apiService } from './api.service'
import { SESSION_USER_KEY, SESSION_AUTH_KEY } from './constants';
import { store } from "../store";
import * as utils from "~/shared/utils";

const appSettings = require("application-settings");

export const authService = {
    login,
    logout,
    currentUser,
    isLoggedIn
};

function login(email, password) {
    return apiService.post('/login', { email, password })
        .then(handleLogin)
}

function logout() {
    appSettings.remove(SESSION_USER_KEY);
    appSettings.remove(SESSION_AUTH_KEY, '');
    utils.closeDrawer();
    utils.disableDrawer();
    store.dispatch("logout");
}

function currentUser() {
    if (appSettings.getString(SESSION_USER_KEY)) {
        return JSON.parse(appSettings.getString(SESSION_USER_KEY));
    } else {
        return null;
    }
}

function handleLogin(data) {
    if (data && data.jwt) {
        signIn(data.jwt);
        utils.enableDrawer();
    } else {
        return Promise.reject(response.error);
    }
}   

function isLoggedIn() {
    return !!this.currentUser();
}

function signIn(token) {
    appSettings.setString(SESSION_AUTH_KEY, token);

    //pass the decoded jwt into IIFE then destructue and set user var.
    var user = (({ first, last }) => ({ first, last }))(jwt.decode(token));

    appSettings.setString(SESSION_USER_KEY, JSON.stringify(user))
    store.dispatch("login")
}
