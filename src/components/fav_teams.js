import Team from "../models/team.js";

/**
 *
 * @param {Team[]} teams
 */
function tmpl(teams) {
  return teams
    .map((team) => {
      return `
      <li class="collection-item avatar">
        <img src="${team.logo}" alt="${team.name}" class="circle">
        <span class="title">${team.name}</span>
        <p>${team.shortName} <br>
            ${team.area}
        </p>
        <a href="#team?id=${team.id}&saved=true" class="secondary-content"><i class="material-icons">grade</i></a>
      </li>
    `;
    })
    .join("");
}

/**
 *
 * @param {Team[]} teams
 */
export default function (teams) {
  const template = document.createElement("template");
  template.innerHTML = tmpl(teams);
  return template.content.cloneNode(true);
}
