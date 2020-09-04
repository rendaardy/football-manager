const webPush = require("web-push");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const moment = require("moment");

dotenv.config();

const BASE_URL = "https://api.football-data.org";

// Find the latest match from Premier League
async function getLatestMatch() {
  const response = await fetch(
    `${BASE_URL}/v2/competitions/2021/matches?status=SCHEDULED`,
    {
      headers: {
        "X-Auth-Token": process.env.API_KEY,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const jsonData = await response.json();

  return jsonData.matches;
}

async function setPayload() {
  const data = await getLatestMatch();
  const competitionName = "Premier League";
  const scheduledDate = moment.utc(data[0].utcDate).format("MMM DD, YYYY");
  const team = `${data[0].homeTeam.name} vs ${data[0].awayTeam.name}`;

  return {
    competitionName,
    scheduledDate,
    team,
  };
}

async function push() {
  const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
  };

  const pushSubscription = {
    endpoint:
      "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABe4jxYZ9sY33aiMzhcPvU51HFwMSmE_qLC_Fx2rmZ1hoOy1A1VxKSIx7lgF8n1aSuDsuf0bYyTQRUKh6AXv57kTIvCoFzXEFr3JZns_Qh_OHwAhBvIqam5QRBQcg5gSxmd93rv-ClO-pkIuyPVg8zgG8M-uNQs6axpnaLkdf9z0PJZpXE",
    keys: {
      p256dh:
        "BGDqnNe5k0tLRjlv3E5GAu4O9+nwTXpp8sJMi+DNy0slIH10r6svZYunye6om0PcpEq6yCWVunEdMVDA4Q6/ueo=",
      auth: "UkxcEib80LcS/FeEMR0duw==",
    },
  };

  const obj = await setPayload();

  const payload = `
    ${obj.competitionName.toUpperCase()}
    ${obj.scheduledDate}
    ${obj.team}
  `.trim();
  const options = {
    gcmAPIKey: "647767774170",
    TTL: 60,
  };

  webPush.setVapidDetails(
    "mailto:renda_ardy@outlook.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  webPush.sendNotification(pushSubscription, payload, options);
}

push();
