export default class Player {
  constructor() {
    this.id = 0;
    this.name = "";
    this.dateOfBirth = "";
    this.countryOfBirth = "";
    this.nationality = "";
    this.position = "";
    this.shirtNumber = "";
  }

  static fromJSON(json) {
    const player = new Player();
    player.id = json.id;
    player.name = json.name;
    player.dateOfBirth = json.dateOfBirth;
    player.countryOfBirth = json.countryOfBirth;
    player.nationality = json.nationality;
    player.position = json.position;
    player.shirtNumber = json.shirtNumber;
    return player;
  }
}
