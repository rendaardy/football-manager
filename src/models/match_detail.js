import Competition from "./competition.js";
import Season from "./season.js";

const TeamDataInterface = {
  id: 0,
  name: "",
  wins: 0,
  draws: 0,
  losses: 0,
};

const TeamScoreInterface = {
  homeTeam: 0,
  awayTeam: 0,
};

export default class MatchDetail {
  constructor() {
    this.id = 0;
    this.competition = new Competition();
    this.season = new Season();
    this.utcDate = "";
    this.status = "";
    this.venue = "";
    this.matchday = 0;
    this.score = {
      winner: "",
      duration: "",
      fullTime: TeamScoreInterface,
      halfTime: TeamScoreInterface,
      extraTime: TeamScoreInterface,
      penalties: TeamScoreInterface,
    };
    this.homeTeam = TeamDataInterface;
    this.awayTeam = TeamDataInterface;
  }

  static fromJSON(json) {
    const match = new MatchDetail();
    match.id = json.match.id;
    match.competition = json.match.competition;
    match.season = json.match.season;
    match.utcDate = json.match.utcDate;
    match.status = json.match.status;
    match.venue = json.match.venue;
    match.matchday = json.match.matchday;
    match.score = json.match.score;
    match.homeTeam = json.match.homeTeam;
    match.awayTeam = json.match.awayTeam;
    return match;
  }
}
