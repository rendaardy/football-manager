export default class Season {
  constructor() {
    this.id = 0;
    this.startDate = "";
    this.endDate = "";
    this.currentMatchday = 0;
    this.winner = "";
  }

  static fromJSON(json) {
    const season = new Season();
    season.id = json.id;
    season.startDate = json.startDate;
    season.endDate = json.endDate;
    season.currentMatchday = json.currentMatchday;
    season.winner = json.winner;
    return season;
  }
}
