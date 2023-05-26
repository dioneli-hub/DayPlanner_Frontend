import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../api-models/user.model";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {UsersProvider} from "../providers/users.provider";
import {environment} from "../environments/environment";
import { TokenModel } from "src/api-models/token.model";
import { BoardModel } from "src/api-models/board.model";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient,
              private usersProvider: UsersProvider) {
  }

  create(firstName: string, lastName: string, email: string, password: string) {
    return this.httpClient.post<UserModel>(`${environment.apiUrl}User/`, {
      firstName,
      lastName,
      email,
      password
    });
  }

  getUser(userId: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${environment.apiUrl}User/${userId}`);
  }

  current(): Observable<UserModel> {
    if (this.usersProvider.currentUser !== null) {
      return of(this.usersProvider.currentUser)
    }

    return this.httpClient
      .get<UserModel>(`${environment.apiUrl}Auth`)
      .pipe(
        tap(user => this.usersProvider.currentUser = user)
      )
  }

  getBoards(userId: number): Observable<Array<BoardModel>> {
    return this.httpClient.get<Array<BoardModel>>(`${environment.apiUrl}User/${userId}/user-boards`);
  }
}
