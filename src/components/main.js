import { Sidenav, Carousel, FloatingActionButton } from "materialize-css";
import {
  FootballNetwork,
  Competitions,
  CompetitionStatus,
} from "../datasources/football_network.js";
import FootballDB from "../datasources/football_db.js";
import carouselPanel from "./carousel_panel.js";
import fixtureTemplate from "./fixture.js";
import scorerTemplate from "./scorers.js";
import matchDetailTemplate from "./match.js";
import teamDetailTemplate from "./team.js";
import upcomingMatchTemplate from "./upcoming.js";
import favMatchesTemplate from "./fav_matches.js";
import favTeamsTemplate from "./fav_teams.js";

/**
 *
 * @param {string} page
 */
async function loadPage(page) {
  const root = document.getElementById("root");

  try {
    const res = await fetch(`pages/${page}.html`, {
      headers: { "Content-Type": "text/html" },
    });

    if (res.status !== 200) {
      throw new Error("Page cannot be loaded");
    }

    root.innerHTML = await res.text();

    switch (page) {
      case "competitions":
        loadCompetitions();
        break;
      case "favorites":
        await loadFavorites();
        break;
      case "fixture":
        await loadFixture();
        break;
      case "scorers":
        await loadScorers();
        break;
      case "upcoming":
        await loadUpcomingMatch();
        break;
      case "result":
        await loadResult();
        break;
      case "match":
        await loadMatchDetail();
        break;
      case "team":
        await loadTeamDetail();
        break;
      case "home":
      default:
        await loadHome();
        break;
    }
  } catch (err) {
    root.innerHTML = `<p>${err}</p>`;
  }
}

async function loadNav() {
  const sidenavElements = document.querySelectorAll(".sidenav");
  Sidenav.init(sidenavElements);

  try {
    const res = await fetch("pages/nav.html", {
      headers: { "Content-Type": "text/html" },
    });

    if (res.status !== 200) {
      throw new Error("Page cannot be loaded");
    }

    const text = await res.text();

    document.querySelectorAll(".topnav, .sidenav").forEach((nav) => {
      nav.innerHTML = text;
    });

    document.querySelectorAll(".topnav a, .sidenav a").forEach((nav) => {
      nav.addEventListener("click", async (event) => {
        const sidenav = document.querySelector(".sidenav");
        Sidenav.getInstance(sidenav).close();

        const page = event.target.getAttribute("href").substr(1);
        await loadPage(page);
      });
    });
  } catch (err) {
    document.getElementById("root").innerHTML = `<p>${err}</p>`;
  }
}

async function loadHome() {
  const progress = document.querySelector(".progress");
  try {
    const container = document.getElementById("carousel");
    const fragment = document.createDocumentFragment();

    const premierLeague = await FootballNetwork.getAllMatchesFrom(
      Competitions.PremierLeague,
      CompetitionStatus.FINISHED
    );

    const bundesliga = await FootballNetwork.getAllMatchesFrom(
      Competitions.Bundesliga,
      CompetitionStatus.FINISHED
    );

    const primeraDivision = await FootballNetwork.getAllMatchesFrom(
      Competitions.PrimeraDivision,
      CompetitionStatus.FINISHED
    );

    fragment.appendChild(carouselPanel("Premier League", premierLeague));
    fragment.appendChild(carouselPanel("Bundesliga", bundesliga));
    fragment.appendChild(carouselPanel("Primera Division", primeraDivision));

    container.appendChild(fragment);

    const carouselElements = document.querySelectorAll(
      ".carousel.carousel-slider"
    );

    Carousel.init(carouselElements, {
      fullWidth: true,
      indicators: true,
    });
  } catch (err) {
    await loadPage("offline");
  } finally {
    progress.classList.toggle("hide");
  }
}

function loadCompetitions() {
  document
    .querySelectorAll(".card > .card-reveal > div > a")
    .forEach((link) => {
      link.addEventListener("click", async (event) => {
        const page = event.target.getAttribute("href").substr(1);
        await loadPage(page.split("?")[0]);
      });
    });
}

async function loadFavorites() {
  const progress = document.querySelectorAll(".progress");
  const favMatchList = document.querySelector(
    "#fav-matches > .card-reveal > .collection"
  );
  const favTeamList = document.querySelector(
    "#fav-teams > .card-reveal > .collection"
  );

  try {
    const favMatches = await FootballDB.getMatches();
    const favTeams = await FootballDB.getTeams();

    if (favMatches.length === 0) {
      favMatchList.innerHTML = `<li class="collection-item">There are no favorite matches in the list</li>`;
    } else {
      favMatchList.appendChild(favMatchesTemplate(favMatches));
    }

    if (favTeams.length === 0) {
      favTeamList.innerHTML = `<li class="collection-item">There are no favorite teams in the list</li>`;
    } else {
      favTeamList.appendChild(favTeamsTemplate(favTeams));
    }

    document.querySelectorAll(".collection-item a").forEach((link) => {
      link.addEventListener("click", async (event) => {
        const page = event.target.parentNode.getAttribute("href").substr(1);
        await loadPage(page.split("?")[0]);
      });
    });
  } catch (err) {
    console.log(err);
    favMatchList.innerHTML = `<li class="collection-item">Oooppss!</li>`;
    favTeamList.innerHTML = `<li class="collection-item">Oooppss!</li>`;
  } finally {
    for (const p of progress) {
      p.classList.toggle("hide");
    }
  }
}

async function loadFixture() {
  const progress = document.querySelector(".progress");
  try {
    const fixtureTable = document.querySelector("#fixture > tbody");
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const id = urlParams.get("id");

    const fixtureData = await FootballNetwork.getStandingsFrom(Number(id));

    fixtureTable.appendChild(fixtureTemplate(fixtureData));

    const btns = document.querySelectorAll(".btn-flat");
    for (const btn of btns) {
      btn.addEventListener("click", async (event) => {
        const page = event.target.getAttribute("href").substr(1);
        await loadPage(page.split("?")[0]);
      });
    }
  } catch (err) {
    await loadPage("offline");
  } finally {
    progress.classList.toggle("hide");
  }
}

async function loadScorers() {
  const progress = document.querySelector(".progress");
  try {
    const scorersList = document.getElementById("scorers");
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const id = urlParams.get("id");

    const scorersData = await FootballNetwork.getScorersFrom(Number(id));

    scorersList.appendChild(scorerTemplate(scorersData));
  } catch (err) {
    await loadPage("offline");
  } finally {
    progress.classList.toggle("hide");
  }
}

async function loadUpcomingMatch() {
  const progress = document.querySelector(".progress");
  try {
    const upcomingMatchList = document.getElementById("upcoming-match-list");
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const id = urlParams.get("id");

    const upcomingMatches = await FootballNetwork.getAllMatchesFrom(
      Number(id),
      CompetitionStatus.SCHEDULED
    );

    upcomingMatchList.appendChild(upcomingMatchTemplate(upcomingMatches));

    const btnsDetail = document.querySelectorAll("#btn-detail");
    for (const btn of btnsDetail) {
      btn.addEventListener("click", async (event) => {
        const page = event.target.getAttribute("href").substr(1);
        await loadPage(page.split("?")[0]);
      });
    }
  } catch (err) {
    await loadPage("offline");
  } finally {
    progress.classList.toggle("hide");
  }
}

async function loadResult() {
  const progress = document.querySelector(".progress");
  try {
    const resultList = document.getElementById("result-match-list");
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const id = urlParams.get("id");

    const results = await FootballNetwork.getAllMatchesFrom(
      Number(id),
      CompetitionStatus.FINISHED
    );

    resultList.appendChild(upcomingMatchTemplate(results));

    const btns = document.querySelectorAll("#btn-detail, #btn-fav");
    for (const btn of btns) {
      btn.addEventListener("click", async (event) => {
        const page = event.target.getAttribute("href").substr(1);
        await loadPage(page.split("?")[0]);
      });
    }
  } catch (err) {
    await loadPage("offline");
  } finally {
    progress.classList.toggle("hide");
  }
}

async function loadMatchDetail() {
  const progress = document.querySelector(".progress");

  try {
    const container = document.querySelector("#match-detail");
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const id = Number(urlParams.get("id"));
    const saved = Boolean(urlParams.get("saved"));

    let data;
    let showSaveButton;
    let clickHandler;
    if (saved) {
      data = await FootballDB.getMatchByID(id);
      showSaveButton = false;
      clickHandler = async () => {
        await FootballDB.deleteMatch(id);
        await loadPage("favorites");
        showNotification("Football Manager", {
          body: "Match has been deleted successfuly",
          requireInteraction: false,
        });
      };
    } else {
      data = await FootballNetwork.getMatchDetail(id);
      showSaveButton = true;
      clickHandler = async () => {
        await FootballDB.saveMatch(data);
        showNotification("Football Manager", {
          body: "Match has been added",
          requireInteraction: false,
        });
      };
    }

    container.appendChild(matchDetailTemplate(data, showSaveButton));

    const fabElem = document.querySelector(".fixed-action-btn");

    fabElem.addEventListener("click", () => {
      clickHandler();
      fabElem.classList.toggle("hide");
    });
  } catch (err) {
    console.log(err);
    await loadPage("offline");
  } finally {
    progress.classList.toggle("hide");
  }
}

async function loadTeamDetail() {
  const progress = document.querySelector(".progress");

  try {
    const container = document.querySelector("#team-detail");
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const id = urlParams.get("id");
    const saved = urlParams.get("saved");

    let data;
    let showSaveButton;
    let clickHandler;
    if (saved) {
      data = await FootballDB.getTeamByID(Number(id));
      showSaveButton = false;
      clickHandler = async () => {
        await FootballDB.deleteTeam(Number(id));
        await loadPage("favorites");
        showNotification("Football Manager", {
          body: "Team has been deleted successfuly",
          requireInteraction: false,
        });
      };
    } else {
      data = await FootballNetwork.getTeamDetail(Number(id));
      showSaveButton = true;
      clickHandler = async () => {
        await FootballDB.saveTeam(data);
        showNotification("Football Manager", {
          body: "Team has been added",
          requireInteraction: false,
        });
      };
    }

    container.appendChild(teamDetailTemplate(data, showSaveButton));

    const fabElem = document.querySelector(".fixed-action-btn");

    fabElem.addEventListener("click", () => {
      clickHandler();
      fabElem.classList.toggle("hide");
    });
  } catch (err) {
    console.log(err);
    await loadPage("offline");
  } finally {
    progress.classList.toggle("hide");
  }
}

/**
 *
 * @param {string} title
 * @param {NotificationOptions} options
 */
async function showNotification(title, options) {
  if (Notification.permission === "granted") {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification(title, options);
  }
}

export default async function main() {
  await loadNav();

  let page = window.location.hash.substr(1);
  if (page === "") {
    page = "home";
  }

  await loadPage(page);
}
