import { basicAuth } from "./auth";

const BASE_URL = (process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.7:5000/v1").replace(/\/$/, "");

export async function apiFetch(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: basicAuth,
    ...options.headers,
  };

  const ruta = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  return fetch(`${BASE_URL}${ruta}`, {
    ...options,
    headers,
  });
}
