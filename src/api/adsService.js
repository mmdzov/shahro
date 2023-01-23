import { post } from "./httpService";

const url = "/ads";

class AdsService {
  async getAds(params = {}) {
    return await post(url, params);
  }

  async getComposeCategory(parent = null) {
    return await post(`${url}-compose-category`, { parent });
  }

  async getComposeFields() {
    return await post(`${url}-compose-field`);
  }

  async adsCompose(params) {
    return await post(`${url}-compose`, params);
  }

  async adsReport(params) {
    return await post(`${url}-report`, params);
  }

  async singleAds(token) {
    return await post(`${url}-single`, { ads: token });
  }

  async deleteSingleAds(token) {
    return await post(`${url}-mylist-delete`, { ads: token });
  }

  async editAds(token) {
    return await post(`${url}-edit-get`, { ads: token });
  }

  async getCategories() {
    return await post(`${url}-category`);
  }

  async getCategoriesWithToken(token) {
    return await post(`${url}-category`, { category: token });
  }

  async adsSearch(params) {
    return await post(`${url}-search`, params);
  }

  async adsLike(params) {
    return await post(`${url}-like`, params);
  }

  async adsOrder() {
    return await post(`${url}-mylist`);
  }

  async getAdsSubCategory(category) {
    return await post(`${url}-subcategory`, { category });
  }
}

export default new AdsService();
