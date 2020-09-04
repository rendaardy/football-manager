import Team from "../models/team.js";

/**
 *
 * @param {Team} team
 * @param {boolean} showSaveButton
 */
function tmpl(team, showSaveButton) {
  return `
    <div class="row">
      <div class="col s12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <div class="row">
              <div class="col s4"><img src="${team.logo}" alt="logo"></div>
              <div class="col s6 offset-s2">
                <div class="row">
                  <div class="col s12"><p>${team.name} - ${team.tla}</p></div>
                  <div class="col s12"><p>Founded : ${team.founded}</p></div>
                  <div class="col s12"><p>Area : ${team.area}</p></div>
                  <div class="col s12"><p>Venue : ${team.venue}</p></div>
                  <div class="col s12"><p>Address : ${team.address}</p></div>
                  <div class="col s12"><p>Email : ${team.email}</p></div>
                  <div class="col s12"><p>Website : ${team.website}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="collection">
      ${team.squad
        .map((player) => {
          return `
          <li class="collection-item">
            <i class="material-icons circle">people</i>
            <span class="title">${player.name}</span>
            <p>
              ${player.nationality}<br />
              ${player.position}<br />
            </p>
          </li>
        `;
        })
        .join("")}
    </ul>
    <div class="fixed-action-btn">
      ${
        showSaveButton
          ? ` <a class="btn-floating btn-large green">
                <i class="large material-icons">save</i>
              </a>`
          : ` <a class="btn-floating btn-large red">
                <i class="large material-icons">remove</i>
              </a>`
      }
    </div>
  `;
}

/**
 *
 * @param {Team} team
 * @param {boolean} showSaveButton
 */
export default function (team, showSaveButton) {
  const template = document.createElement("template");
  template.innerHTML = tmpl(team, showSaveButton);
  return template.content.cloneNode(true);
}
