import { getRequest } from "../../common/services/ajax-service";
import { Constants } from "../../common/utils/Constants";

export class ScheduceService {
  static async getBusByScheduceDate(startDate: number, endDate: number) {
    return await getRequest(
      Constants.API_URL.FIND_BUS_BY_SCHEDUCE_DATE(startDate, endDate)
    );
  }

  static async getTicketByScheduceId(scheduceId: number){
    return await getRequest(
      Constants.API_URL.EXPORT_TICKET(scheduceId)
    );
  }
}
