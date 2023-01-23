import { post } from "./httpService";
const url = "/post";

class PostService {
  async addPost(params) {
    return await post(`${url}-compose`, params, {
      "Accept-Language": "en-US;en;q=0.8",
      "Content-Type": `multipart/form-data; charset=utf-8; boundary="boundary"`,
    });
  }

  async editPost(params) {
    return await post(`${url}-edit`, params, {
      "Accept-Language": "en-US;en;q=0.8",
      "Content-Type": `multipart/form-data; charset=utf-8; boundary="boundary"`,
    });
  }

  async getEditPost(params) {
    return await post(`${url}-edit-get`, params);
  }

  async getMyPostList() {
    return await post(`${url}-mylist`);
  }

  async getMediaData() {
    return await post(`${url}`);
  }

  async getMorePosts(params) {
    return await post(`${url}`, params);
  }

  async deleteSinglePost(token) {
    return await post(`${url}-mylist-delete`, { post: token });
  }

  async mediaSearch(params) {
    return await post(`/ads-search`, params);
  }
}

export default new PostService();
