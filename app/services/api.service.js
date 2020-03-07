import * as http from "http";
import { SESSION_AUTH_KEY } from "./constants";

const appSettings = require("application-settings");
const serverUrl = `http://${SERVER_ENDPOINT}`;

function get(path) {
    return execute("GET", path);
}

function post(path, payload) {
    return execute("POST", path, stringify(payload));
}

function getServerUrl(path, payload) {
    return serverUrl;
}

// eslint-disable-next-line no-unused-vars
function put(path, payload) {
    return execute("PUT", path, stringify(payload));
}

//the word 'delete 'is a js operator
// eslint-disable-next-line no-unused-vars
function del(path) {
    return execute("DELETE", path);
}
// eslint-disable-next-line no-unused-vars
function patch(path, payload) {
    return execute("PATCH", path, stringify(payload));
}

function execute(method, path, content = {}) {
    return http
        .request(requestConfig({ method: method, ...content }, path))
        .then(response => {
            if (response.headers["X-Message"]) {
                throw response.headers["X-Message"];
            }
            if (response.statusCode == 500) {
                let content = response.content.toJSON();
                throw `${content.error} -- ${content.exception.toString()}`;
            } else {
                return response.content.toJSON();
            }
        })
        .catch(errHandler);
}

function requestConfig(custConfig, path) {
    let url = `${serverUrl}${path}`;
    let baseConfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: appSettings.getString(SESSION_AUTH_KEY)
        },
        content: ""
    };

    return { ...baseConfig, ...custConfig, url: url };
}

function stringify(payload) {
    return { content: JSON.stringify(payload) };
}

function errHandler(err) {
    let msg = isError(err) ? err.message : err;
    throw msg;
}

function isError(value) {
    return value instanceof Error && typeof value.message !== "undefined";
}

export const apiService = {
    post,
    get,
    getServerUrl
};
