import moment from "moment";
import MatchDetail from "../models/match_detail.js";

/**
 *
 * @param {MatchDetail[]} matches
 */
function tmpl(matches) {
  return matches
    .map((match) => {
      return `
      <li class="collection-item avatar">
        <i class="material-icons circle green">insert_chart</i>
        <span class="title">${match.homeTeam.name} vs ${
        match.awayTeam.name
      }</span>
        <p>${moment.utc(match.utcDate).format("YYYY, DD MM")} <br>
          ${match.status}
        </p>
        <a href="#match?id=${
          match.id
        }&saved=true" class="secondary-content"><i class="material-icons">grade</i></a>
      </li>
    `;
    })
    .join("");
}

/**
 *
 * @param {MatchDetail[]} matches
 */
export default function (matches) {
  const template = document.createElement("template");
  template.innerHTML = tmpl(matches);
  return template.content.cloneNode(true);
}
