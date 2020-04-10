import nodeify from "nativescript-nodeify";
import jwt from "jsonwebtoken";
import { apiService } from "./api.service";
import { SESSION_USER_KEY, SESSION_AUTH_KEY } from "./constants";
import { store } from "../store";
import * as utils from "~/shared/utils";

const appSettings = require("application-settings");

export const authService = {
    login,
    logout,
    register,
    currentUser,
    isLoggedIn
};

function login(email, password) {
    return apiService
        .post("/login", { email, password })
        .then(handleLogin)
        .catch(error => {
            throw new Error(error);
        });
}

function register(email, password, firstName, lastName) {
    return apiService
        .post("/register", { email, password, firstName, lastName })
        .then(handleRegistration)
        .catch(error => {
            throw new Error(error);
        });
}

function logout() {
    store.dispatch("logout");
}
function currentUser() {
    if (appSettings.getString(SESSION_USER_KEY)) {
        return JSON.parse(appSettings.getString(SESSION_USER_KEY));
    } else {
        return null;
    }
}

function handleRegistration(data) {
    handleLogin(data);
}

function handleLogin(data) {
    if (data && data.error) {
        throw new Error(data.error);
    }

    if (data && data.jwt) {
        signIn(data.jwt);
        utils.enableDrawer();
    }
}

function isLoggedIn() {
    return store.getters.isLoggedIn;
}

function signIn(token) {
    //pass the decoded jwt into IIFE then destructure and set user to extreact name and email.
    // practicing my es6-fu
    let user = (({ email, name }) => ({ email, name }))(jwt.decode(token));
    store.dispatch("login", { token, user });
}
