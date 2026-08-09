import { basicAuth } from "./auth";

// En un APK, localhost apunta al telefono, no a la computadora que ejecuta la API.
// EXPO_PUBLIC_API_URL permite cambiar el servidor sin modificar este archivo.
const BASE_URL = (process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.7:5000/v1")
  .replace(/\/$/, "");

const REQUEST_TIMEOUT_MS = 10000;

export async function apiFetch(endpoint, options = {}) {
  const ruta = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const url = `${BASE_URL}${ruta}`;

  console.log("========== API ==========");
  console.log("URL:", url);
  console.log("METHOD:", options.method || "GET");
  console.log("==========================");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: basicAuth,
        ...options.headers,
      },
      signal: options.signal || controller.signal,
    });
  } catch (error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      throw new Error(`La API no respondio en ${REQUEST_TIMEOUT_MS / 1000} segundos (${BASE_URL})`);
    }

    throw new Error(
      `No se pudo conectar con la API (${BASE_URL}). ` +
      "Verifica que el servidor este encendido y que el telefono use la misma red Wi-Fi."
    );
  } finally {
    clearTimeout(timeout);
  }
}
