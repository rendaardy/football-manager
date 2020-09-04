import Scorer from "../models/scorer.js";

/**
 *
 * @param {Scorer[]} scorers
 */
function tmpl(scorers) {
  return scorers
    .map((scorer) => {
      return `
      <li class="collection-item avatar">
        <i class="material-icons circle">people</i>
        <span class="title">${scorer.player.name}</span>
        <p>
          ${scorer.numberOfGoals} goals <br />
          ${scorer.team.name}
        </p>
      </li>
    `;
    })
    .join("");
}

/**
 *
 * @param {Scorer[]} scorers
 */
export default function (scorers) {
  const template = document.createElement("template");
  template.innerHTML = tmpl(scorers);
  return template.content.cloneNode(true);
}
