import { post } from "./httpService";
const url = "/product";

class ShopService {
  async getProducts() {
    return await post(`/product`);
  }

  async getSingleCat(category) {
    return await post(url, { category: category });
  }

  async orderCancel(order) {
    return await post(`${url}-order-cancel`, { order });
  }

  async productOrderSingle(order) {
    return await post(`${url}-order-single`, { order });
  }

  async getSingleEditProduct(token) {
    return await post(`${url}-edit-get`, { product: token });
  }

  async getSingleProduct(token) {
    return await post(`${url}-single`, { product: token });
  }

  async deleteSingleProduct(token) {
    return await post(`${url}-mylist-delete`, { product: token });
  }

  async productCompose(params) {
    return await post(`${url}-compose`, params);
  }

  async setEditProduct(params) {
    return await post(`${url}-edit`, params);
  }

  async submitBasketSend(params) {
    return await post(`${url}-basket-send`, params);
  }

  async setLike(params) {
    return await post(`${url}-like`, params);
  }

  async addToBasket(params) {
    return await post(`${url}-basket-add`, params);
  }

  async getBasket() {
    return await post(`${url}-basket`);
  }

  async clearBasket() {
    return await post(`${url}-basket-clear`);
  }

  async getMyPostList() {
    return await post(`${url}-mylist`);
  }

  async getComments(token) {
    return await post(`${url}-single-comments`, { product: token });
  }

  async storeSearch(params) {
    return await post(`${url}-search`, params);
  }

  async setLikeComment(params) {
    return await post(`${url}-comment-like`, params);
  }

  async reportComment(params) {
    return await post(`${url}-comment-report`, params);
  }

  async submitComment(params) {
    return await post(`${url}-comment-submit`, params);
  }

  async getCommentItem(token) {
    return await post(`${url}-comment-form`, { product: token });
  }

  async reportProduct(params) {
    return await post(`${url}-report`, params);
  }
  async productOrder() {
    return await post(`${url}-order`);
  }

  async sendBasket(params) {
    return await post(`${url}-basket-send`, params);
  }

  async setDiscount(params) {
    return await post(`${url}-discount`, params);
  }
}
export default new ShopService();
