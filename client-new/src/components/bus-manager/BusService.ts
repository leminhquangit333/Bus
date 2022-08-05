import { getRequest, postRequest } from "../../common/services/ajax-service";
import { Constants } from "../../common/utils/Constants";

export class BusService {

  static async saveBus(data: any) {
    return await postRequest(Constants.API_URL.SAVE_BUS, data);
  }

  static async findAllBus() {
    return await getRequest(Constants.API_URL.FIND_ALL_BUS);
  }
}
