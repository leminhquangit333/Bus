import { postRequest } from "../../common/services/ajax-service";
import { Constants } from "../../common/utils/Constants";

export class LoginService {
  static async login(user: any) {
    return await postRequest(Constants.API_URL.LOGIN, user);
  }
}
