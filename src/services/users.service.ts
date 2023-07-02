import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../api-models/user.model";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {UserProvider} from "../providers/user.provider";
import {environment} from "../environments/environment";
import { TokenModel } from "src/api-models/token.model";
import { BoardModel } from "src/api-models/board.model";
import { BoardMemberModel } from "src/api-models/board-member.model";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient,
              private userProvider: UserProvider) {
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
    if (this.userProvider.currentUser !== null) {
      return of(this.userProvider.currentUser)
    }

    return this.httpClient
      .get<UserModel>(`${environment.apiUrl}Auth`)
      .pipe(
        tap(user => this.userProvider.currentUser = user)
      )
  }

  getBoards(userId: number): Observable<Array<BoardModel>> { //User in URL
    return this.httpClient.get<Array<BoardModel>>(`${environment.apiUrl}BoardMember/${userId}/user-boards`);
  }

  getBoardMembers(boardId: number): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>(`${environment.apiUrl}BoardMember/boards/${boardId}/get-members`);
  }

  addBoardMember(boardId: number, email: string): Observable<UserModel>  {
    return this.httpClient.post<UserModel>(`${environment.apiUrl}BoardMember/boards/${boardId}/add-board-member-by-email/${email}`, {});
  }
 

  deleteBoardMember(boardId:number, memberId: number) {
    return this.httpClient.delete(`${environment.apiUrl}BoardMember/boards/${boardId}/delete-member/${memberId}`,
    {responseType: 'text'});
  }}
  
