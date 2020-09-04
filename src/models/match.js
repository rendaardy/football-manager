import Season from "./season.js";

const TeamDataInterface = {
  id: 0,
  name: "",
};

const TeamScoreInterface = {
  homeTeam: 0,
  awayTeam: 0,
};

export default class Match {
  constructor() {
    this.id = 0;
    this.season = new Season();
    this.utcDate = "";
    this.status = "";
    this.matchday = 0;
    this.stage = "";
    this.group = "";
    this.score = {
      winner: "",
      fullTime: TeamScoreInterface,
      halfTime: TeamScoreInterface,
      extraTime: TeamScoreInterface,
      penalties: TeamScoreInterface,
    };
    this.homeTeam = TeamDataInterface;
    this.awayTeam = TeamDataInterface;
  }

  static fromJSON(json) {
    const match = new Match();
    match.id = json.id;
    match.season = Season.fromJSON(json.season);
    match.utcDate = json.utcDate;
    match.status = json.status;
    match.matchday = json.matchday;
    match.stage = json.stage;
    match.group = json.group;
    match.score = json.score;
    match.homeTeam = json.homeTeam;
    match.awayTeam = json.awayTeam;
    return match;
  }
}
