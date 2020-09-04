import moment from "moment";
import Match from "../models/match.js";

/**
 *
 * @param {string} title
 * @param {Match[]} matchList
 * @returns {string}
 */
function tmpl(title, matchList) {
  return `
    <section class="section">
      <h1>${title}</h1>
      <div class="carousel carousel-slider center hoverable">
        ${matchList
          .slice(0, 11)
          .map(
            (match) => `
            <div class="carousel-item blue-grey darken-1 white-text" href="#${`match?id=${match.id}`}">
              <div class="row">
                <div class="col s12">
                  <h2>${moment.utc(match.utcDate).format("MMM DD, YYYY")}</h2>
                </div>
                <div class="col s12 m5 team-name">${match.homeTeam.name}</div>
                <div class="col s12 m2 team-score">
                ${
                  match.score.fullTime.homeTeam !== null
                    ? match.score.fullTime.homeTeam
                    : ""
                } - ${
              match.score.fullTime.awayTeam !== null
                ? match.score.fullTime.awayTeam
                : ""
            }
                </div>
                <div class="col s12 m5 team-name">${match.awayTeam.name}</div>
              </div>
            </div>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}

/**
 *
 * @param {string} title
 * @param {Match[]} matchList
 * @returns {Node}
 */
export default function (title, matchList) {
  const template = document.createElement("template");
  template.innerHTML = tmpl(title, matchList);
  return template.content.cloneNode(true);
}
