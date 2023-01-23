import { post } from "./httpService";
const url = "/user";
const url1 = "/profile";
const urlAcc = "/account";
const myList = "/mylist";
class AccountService {
  async getProfile(account = {}) {
    return await post(`${url1}-page`, account);
  }

  async getLocation() {
    return await post(`${url}-location`);
  }
  async addLocation(params) {
    return await post(`${url}-location-add`, params);
  }

  async setAddress(location) {
    return await post(`${url}-location-set`, { location });
  }

  async editAddress(params) {
    return await post(`${url}-location-edit`, params);
  }

  async favorite(param) {
    return await post(`${myList}-favorite`, param);
  }

  async followUser(account) {
    return await post(`${urlAcc}-follow`, { account });
  }

  async unfollowUser(account) {
    return await post(`${urlAcc}-unfollow`, { account });
  }

  async deleteAddress(location) {
    return await post(`${url}-location-delete`, { location });
  }

  async getWallet(params) {
    return await post(`/payment`, params);
  }

  async getFollowers(followers = {}) {
    return await post(`${url1}-follower`, followers);
  }

  async getFollowings(followings = {}) {
    return await post(`${url1}-following`, followings);
  }

  async getUserAccount() {
    return await post(`${url}`);
  }

  async updateAccount(param) {
    return await post(`${url}-update`, param);
  }

  async addImage(param) {
    return await post(`${url}-avatar`, param, {
      // "accept": "application/json",
      "Accept-Language": "en-US;en;q=0.8",
      "Content-Type": `multipart/form-data; charset=utf-8; boundary="boundary"`,
    });
  }

  async activeSessions() {
    return await post(`/session`);
  }

  async sessionKill(param) {
    return await post(`/session-kill`, param);
  }

  async logout() {
    return await post(`/logout`);
  }
}

export default new AccountService();
