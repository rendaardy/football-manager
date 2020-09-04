import Competition from "./competition.js";
import Player from "./player.js";

export default class Team {
  constructor() {
    this.id = 0;
    this.area = "";
    /** @type {Competition[]} */
    this.activeCompetitions = [];
    this.name = "";
    this.shortName = "";
    this.tla = "";
    this.logo = "";
    this.address = "";
    this.phone = "";
    this.website = "";
    this.email = "";
    this.founded = 0;
    this.venue = "";
    /** @type {Player[]} */
    this.squad = [];
  }

  static fromJSON(json) {
    const team = new Team();
    team.id = json.id;
    team.area = json.area.name;
    team.activeCompetitions = json.activeCompetitions.map((competition) => ({
      id: competition.id,
      name: competition.name,
    }));
    team.name = json.name;
    team.shortName = json.shortName;
    team.tla = json.tla;
    team.logo = json.crestUrl;
    team.address = json.address;
    team.phone = json.phone;
    team.website = json.website;
    team.email = json.email;
    team.founded = json.founded;
    team.venue = json.venue;
    team.squad = json.squad.map((player) => Player.fromJSON(player));
    return team;
  }
}
