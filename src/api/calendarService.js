import { post } from "./httpService.js";

const url = "/calendar-event";

class CalendarService {
  async addPopup(form) {
    return await post(`${url}-add`, form);
  }
  async modifyPopup(modify) {
    return await post(`${url}-edit`, modify);
  }
  async getEvents(params) {
    return await post(url, params);
  }
  async deleteEvent(token) {
    return await post(`${url}-delete`, { token });
  }
}

export default new CalendarService();
