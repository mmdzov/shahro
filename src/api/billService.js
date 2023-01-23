import { post } from "./httpService";

class BillService {
  async payBill(params) {
    return await post(`/pay-bill`, params);
  }
  async checkBill(params) {
    return await post(`/check-bill`, params);
  }
}

export default new BillService();
