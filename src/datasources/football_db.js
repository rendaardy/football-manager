import idb from "idb";
import Team from "../models/team.js";
import MatchDetail from "../models/match_detail.js";

function openDB() {
  return idb.open("football-manager", 1, (db) => {
    const teamsObjectStore = db.createObjectStore("fav-teams", {
      keyPath: "id",
    });

    teamsObjectStore.createIndex("id", "id", { unique: true });

    const matchesObjectStore = db.createObjectStore("fav-matches", {
      keyPath: "id",
    });

    matchesObjectStore.createIndex("id", "id", { unique: true });
  });
}

/**
 *
 * @param {string} storeName
 * @param {"readonly" | "readwrite" | undefined} mode
 */
async function getObjectStore(storeName, mode) {
  const db = await openDB();
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

export default class FootballDB {
  /**
   * @returns {Promise<MatchDetail[]>}
   */
  static async getMatches() {
    const store = await getObjectStore("fav-matches", "readonly");
    return store.getAll();
  }

  /**
   * @returns {Promise<Team[]>}
   */
  static async getTeams() {
    const store = await getObjectStore("fav-teams", "readonly");
    return store.getAll();
  }

  /**
   *
   * @param {number} id
   * @returns {Promise<MatchDetail>}
   */
  static async getMatchByID(id) {
    const store = await getObjectStore("fav-matches", "readonly");
    return store.get(id);
  }

  /**
   *
   * @param {number} id
   * @returns {Promise<Team>}
   */
  static async getTeamByID(id) {
    const store = await getObjectStore("fav-teams", "readonly");
    return store.get(id);
  }

  /**
   *
   * @param {Team} team
   */
  static async saveTeam(team) {
    const store = await getObjectStore("fav-teams", "readwrite");
    return store.put(team);
  }

  /**
   *
   * @param {MatchDetail} match
   */
  static async saveMatch(match) {
    const store = await getObjectStore("fav-matches", "readwrite");
    return store.put(match);
  }

  /**
   *
   * @param {number} id
   */
  static async deleteTeam(id) {
    const store = await getObjectStore("fav-teams", "readwrite");
    return store.delete(id);
  }

  /**
   *
   * @param {number} id
   */
  static async deleteMatch(id) {
    const store = await getObjectStore("fav-matches", "readwrite");
    return store.delete(id);
  }
}
