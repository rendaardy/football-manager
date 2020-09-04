export default class Standing {
  constructor() {
    this.position = 0;
    this.team = {
      id: 0,
      name: "",
      logo: "",
    };
    this.playedGames = 0;
    this.won = 0;
    this.draw = 0;
    this.lost = 0;
    this.points = 0;
    this.goalsFor = 0;
    this.goalsAgainst = 0;
    this.goalDifference = 0;
  }

  static fromJSON(json) {
    const standing = new Standing();
    standing.position = json.position;
    standing.team = {
      id: json.team.id,
      name: json.team.name,
      logo: json.team.crestUrl,
    };
    standing.playedGames = json.playedGames;
    standing.won = json.won;
    standing.draw = json.draw;
    standing.lost = json.lost;
    standing.points = json.points;
    standing.goalsFor = json.goalsFor;
    standing.goalsAgainst = json.goalsAgainst;
    standing.goalDifference = json.goalDifference;
    return standing;
  }
}
