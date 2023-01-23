import axios from "axios";
import { shv1 } from "./endpoint.json";
import { post } from "./httpService";

class AuthService {
  async guest() {
    const { data } = await axios.get(`${shv1}/guest`);
    return data;
  }

  async signIn(number) {
    return await post(`/sign-in`, {
      phoneNumber: "98" + number,
    });
  }

  async sendVerifyCode(auth, code) {
    const { data } = await axios.post(`${shv1}/verification`, {
      authID: auth,
      verifyCode: code,
    });
    return data;
  }
}

export default new AuthService();
