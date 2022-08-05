import { getRequest } from "../../common/services/ajax-service";
import { Constants } from "../../common/utils/Constants";

export class TicketManagerService {
  static async getBusByScheduceDate(startDate: number, endDate: number) {
    return await getRequest(
      Constants.API_URL.FIND_BUS_BY_SCHEDUCE_DATE(startDate, endDate)
    );
  }

  static async getBusDetailById(scheduceId: number) {
    return await getRequest(
      Constants.API_URL.GET_BUS_DETAIL(scheduceId)
    );
  }
}
