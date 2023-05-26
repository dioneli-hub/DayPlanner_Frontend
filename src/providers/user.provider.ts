import {Injectable} from "@angular/core";
import {UserModel} from "../api-models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserProvider {
  currentUser: UserModel | null = null;
}
