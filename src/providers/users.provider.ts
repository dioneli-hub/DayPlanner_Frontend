import {Injectable} from "@angular/core";
import {UserModel} from "../api-models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersProvider {
  currentUser: UserModel | null = null;
}
