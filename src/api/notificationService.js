import { post } from "./httpService";
const url = "/notification";

class NotificationService {
  async getNotifications(page) {
    return await post(url, { notificationPage: page });
  }
}

export default new NotificationService();
