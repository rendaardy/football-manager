import Player from "./player.js";

export default class Scorer {
  constructor() {
    this.player = new Player();
    this.team = {
      id: 0,
      name: "",
    };
    this.numberOfGoals = 0;
  }

  static fromJSON(json) {
    const scorer = new Scorer();
    scorer.player = Player.fromJSON(json.player);
    scorer.team = {
      id: json.team.id,
      name: json.team.name,
    };
    scorer.numberOfGoals = json.numberOfGoals;
    return scorer;
  }
}
