import * as http from "http";
import { SESSION_AUTH_KEY } from './constants';

const appSettings = require("application-settings");

// FIXME change LOCAL_IP to SERVER_ENDPOINT and handle
// qa and production deployments

const baseURL = `http://${LOCAL_IP}:3000/`;

function get(path) {
  return execute('GET', path)
}

function post(path, payload) {
  return execute('POST', path, stringify(payload))
}

// eslint-disable-next-line no-unused-vars
function put(path, payload) {
  return execute('PUT', path, stringify(payload))
}

//the word 'delete 'is a js operator
// eslint-disable-next-line no-unused-vars
function del(path) {
  return execute('DELETE', path)
}
// eslint-disable-next-line no-unused-vars
function patch(path, payload) {
  return execute('PATCH', path, stringify(payload))
}

function execute(method, path, content = {}) {
  return http.request(requestConfig({ method: method, ...content }, path))
    .then((response) => {
      return response.content.toJSON();
    })
}

function requestConfig(custConfig, path) {
  let url = `${baseURL}/${path}`
  let baseConfig = {
    headers: { 'Content-Type': 'application/json', 'Authorization': appSettings.getString(SESSION_AUTH_KEY) },
    content: ""
  };

  return { ...baseConfig, ...custConfig, url: url };
}

function stringify(payload) {
  return { content: JSON.stringify(payload) }
}

function errHandler(error) {
  let msg;
  if (error.response) {
    msg = error.response.data.error;
  } else if (error.request) {
    msg = "Server not responding";
  } else {
    msg = "Unable to connect to API";
  }
  throw new Error(msg);
}

export const apiService = {
  post,
  get,
};
