import MatchDetail from "../models/match_detail.js";
import Match from "../models/match.js";
import Standing from "../models/standing.js";
import Scorer from "../models/scorer.js";
import Team from "../models/team.js";

export const Competitions = Object.freeze({
  UEFAChampionsLeague: 2001,
  Bundesliga: 2002,
  Eredivisie: 2003,
  PremierLeague: 2021,
  PrimeraDivision: 2014,
  Ligue1: 2015,
});

export const CompetitionStatus = Object.freeze({
  SCHEDULED: "SCHEDULED",
  POSTPONED: "POSTPONED",
  FINISHED: "FINISHED",
  CANCELED: "CANCELED",
});

const BASE_URL = "https://api.football-data.org";
const headers = new Headers({ "X-Auth-Token": process.env.API_KEY });

export class FootballNetwork {
  /**
   *
   * @param {number} competitionID
   * @param {string} status
   * @returns {Promise<Match[]>}
   */
  static async getAllMatchesFrom(competitionID, status = "") {
    const response = await fetch(
      `${BASE_URL}/v2/competitions/${competitionID}/matches?status=${status}`,
      { headers }
    );

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const jsonData = await response.json();
    return jsonData.matches.map((match) => Match.fromJSON(match));
  }

  /**
   * @returns {Promise<MatchDetail[]>}
   */
  static async getTodayMatches() {
    const response = await fetch(`${BASE_URL}/v2/matches`, { headers });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const jsonData = await response.json();
    return jsonData.matches.map((match) => MatchDetail.fromJSON(match));
  }

  /**
   *
   * @param {number} matchID
   * @returns {Promise<MatchDetail>}
   */
  static async getMatchDetail(matchID) {
    const response = await fetch(`${BASE_URL}/v2/matches/${matchID}`, {
      headers,
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const jsonData = await response.json();
    return MatchDetail.fromJSON(jsonData);
  }

  /**
   *
   * @param {number} competitionID
   * @returns {Promise<Standing[]>}
   */
  static async getStandingsFrom(competitionID) {
    const response = await fetch(
      `${BASE_URL}/v2/competitions/${competitionID}/standings`,
      { headers }
    );

    if (response.status !== 200) {
      return Promise.reject(response.statusText);
    }

    const jsonData = await response.json();
    return jsonData.standings[0].table.map((standing) =>
      Standing.fromJSON(standing)
    );
  }

  /**
   *
   * @param {number} competitionID
   * @returns {Promise<Scorer[]>}
   */
  static async getScorersFrom(competitionID) {
    const response = await fetch(
      `${BASE_URL}/v2/competitions/${competitionID}/scorers`,
      { headers }
    );

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const jsonData = await response.json();
    return jsonData.scorers.map((scorer) => Scorer.fromJSON(scorer));
  }

  /**
   *
   * @param {number} teamID
   * @returns {Promise<Team>}
   */
  static async getTeamDetail(teamID) {
    const response = await fetch(`${BASE_URL}/v2/teams/${teamID}`, { headers });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const jsonData = await response.json();
    return Team.fromJSON(jsonData);
  }
}
