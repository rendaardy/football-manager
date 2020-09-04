import moment from "moment";
import Match from "../models/match.js";

/**
 *
 * @param {Match[]} matches
 */
function tmpl(matches) {
  return matches
    .map((m) => {
      return `
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">${moment
              .utc(m.utcDate)
              .format("MMM DD, YYYY")}, Match Day ${m.matchday}</span>
            <p>
              ${m.homeTeam.name} vs ${m.awayTeam.name}
            </p>
            <p>${m.status}</p>
          </div>
          <div class="card-action">
            <a id="btn-detail" href="#match?id=${m.id}">Detail</a>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

/**
 *
 * @param {Match[]} matches
 */
export default function (matches) {
  const template = document.createElement("template");
  template.innerHTML = tmpl(matches);
  return template.content.cloneNode(true);
}
