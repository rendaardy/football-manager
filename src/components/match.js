import moment from "moment";
import MatchDetail from "../models/match_detail.js";

/**
 *
 * @param {MatchDetail} match
 * @param {boolean} showSaveButton
 */
function tmpl(match, showSaveButton) {
  return `
    <div class="row">
      <div class="col s12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <h3 class="card-title">${match.competition.name}, Match Day ${
    match.matchday
  }</h3>
            <h4>${moment.utc(match.utcDate).format("MMMM DD, YYYY")}, ${
    match.venue
  }</h4>
            <div class="row">
              <div class="col s12"><p class="flow-text center-align">${
                match.status
              }</p></div>
              <div class="col s5"><p class="flow-text center-align">${
                match.homeTeam.name
              }</p></div>
              <div class="col s2"><p class="flow-text center align">vs</p></div>
              <div class="col s5"><p class="flow-text center align">${
                match.awayTeam.name
              }</p></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12"><p class="flow-text center-align">Half Time</p></div>
      <div class="col s12"><p class="flow-text center-align">${
        match.score.halfTime.homeTeam !== null
          ? match.score.halfTime.homeTeam
          : ""
      } - ${
    match.score.halfTime.awayTeam !== null ? match.score.halfTime.awayTeam : ""
  }</p></div>
      <div class="col s12"><p class="flow-text center-align">Full Time</p></div>
      <div class="col s12"><p class="flow-text center-align">${
        match.score.fullTime.homeTeam !== null
          ? match.score.fullTime.homeTeam
          : ""
      } - ${
    match.score.fullTime.awayTeam !== null ? match.score.fullTime.awayTeam : ""
  }</p></div>
      <div class="col s12"><p class="flow-text center-align">Extra Time</p></div>
      <div class="col s12"><p class="flow-text center-align">${
        match.score.extraTime.homeTeam !== null
          ? match.score.extraTime.homeTeam
          : ""
      } - ${
    match.score.extraTime.awayTeam !== null
      ? match.score.extraTime.awayTeam
      : ""
  }</p></div>
      <div class="col s12"><p class="flow-text center-align">Penalties</p></div>
      <div class="col s12"><p class="flow-text center-align">${
        match.score.penalties.homeTeam !== null
          ? match.score.penalties.homeTeam
          : ""
      } - ${
    match.score.penalties.awayTeam !== null
      ? match.score.penalties.awayTeam
      : ""
  }</p></div>
    </div>
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
 * @param {MatchDetail} m
 * @param {boolean} showSaveButton
 */
export default function (m, showSaveButton) {
  const template = document.createElement("template");
  template.innerHTML = tmpl(m, showSaveButton);
  return template.content.cloneNode(true);
}
