import Season from "./season.js";

export default class Competition {
  constructor() {
    this.id = 0;
    this.name = "";
    this.code = "";
    this.emblemUrl = "";
    this.currentSeason = new Season();
  }

  static fromJSON(json) {
    const competition = new Competition();
    competition.id = json.id;
    competition.name = json.name;
    competition.code = json.code;
    competition.emblemUrl = json.emblemUrl;
    competition.currentSeason = Season.fromJSON(json.currentSeason);
    return competition;
  }
}
