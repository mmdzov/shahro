import { post } from "./httpService";

const url = "/rent";

class RentService {
  async getSingleFare(token) {
    return await post(`${url}-single`, { rent: token });
  }
  async fareLike(token, value) {
    return await post(`${url}-like`, { rent: token, value });
  }
  async fareSearch(params) {
    return await post(`/ads-search`, params);
  }
  async getFares() {
    return await post(`${url}`);
  }
}

export default new RentService();
