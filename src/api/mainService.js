import axios from "axios";
import { post } from "./httpService";
import { shv1 } from "./endpoint.json";
class MainService {
  async getMainData() {
    return await post(`/main`);
  }
  async getMainDataFirstTime(auth, session) {
    const { data } = await axios.post(
      `${shv1}/main`,
      {},
      {
        headers: {
          authID: auth,
          sessionID: session,
        },
      }
    );
    return data;
  }
}

export default new MainService();
