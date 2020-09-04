import "regenerator-runtime";

import "./style.scss";
import main from "./components/main.js";

/**
 *
 * @param {string} base64String
 * @returns {Uint8Array}
 */
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

async function subscribe() {
  if ("PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      const subs = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BPTU59fGl-jKSnfXGq0cAZVGrXYR40kKEGk4tcYMOP8WiQD4QPhC7BWTag8QKSQJfnNSSIAYOJbsCL81TYuOQ4Q"
        ),
      });

      // console.log("Success:", subs.endpoint);
      // console.log(
      //   "p256dh",
      //   window.btoa(
      //     String.fromCharCode.apply(null, new Uint8Array(subs.getKey("p256dh")))
      //   )
      // );
      // console.log(
      //   "auth",
      //   window.btoa(
      //     String.fromCharCode.apply(null, new Uint8Array(subs.getKey("auth")))
      //   )
      // );
    } catch (err) {
      console.log("Failed:", err.message);
    }
  }
}

async function requestPermission() {
  const permission = await Notification.requestPermission();

  switch (permission) {
    case "granted":
      console.log("granted");
      await subscribe();
      break;
    case "denied":
      console.log("denied");
      break;
    default:
      console.log("default");
      break;
  }
}

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("DOMContentLoaded", async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Registration successful :", registration);
    } catch (err) {
      console.error("Registration failed :", err);
    }
  }

  if ("Notification" in window) {
    await requestPermission();
  } else {
    console.log("Browser doesn't support Notification");
  }
});
