import Standing from "../models/standing.js";

/**
 *
 * @param {Standing[]} standings
 */
function tmpl(standings) {
  return standings
    .map((standing) => {
      return `
    <tr>
      <td>${standing.position}</td>
      <td>
        <div class="row">
          <div class="col"><img src="${standing.team.logo}" alt="logo" width="30px"></div>
          <div class="col"><a class="btn-flat waves-effect waves-teal" href="#team?id=${standing.team.id}">${standing.team.name}</a></div>
        </div>
      </td>
      <td>${standing.playedGames}</td>
      <td>${standing.won}</td>
      <td>${standing.draw}</td>
      <td>${standing.lost}</td>
      <td>${standing.goalsFor}</td>
      <td>${standing.goalsAgainst}</td>
      <td>${standing.goalDifference}</td>
      <td>${standing.points}</td>
    </tr>
  `;
    })
    .join("");
}

/**
 *
 * @param {Standing[]} standings
 */
export default function (standings) {
  const template = document.createElement("template");
  template.innerHTML = tmpl(standings);
  return template.content.cloneNode(true);
}
