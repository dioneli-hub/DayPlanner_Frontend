import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../api-models/user.model";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {UserProvider} from "../providers/user.provider";
import {environment} from "../environments/environment";
import { TokenModel } from "src/api-models/token.model";
import { BoardModel } from "src/api-models/board.model";
import { BoardMemberModel } from "src/api-models/board-member.model";
import { ServiceResponse } from "src/api-models/service-response.model";

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

  verify(verification_token: string) {
    return this.httpClient
      .patch(`${environment.apiUrl}User/verify`,
      { "token": verification_token } ,
      {responseType: 'text'}
      )
  }

  forgotPassword(email: string) {
    return this.httpClient
    .patch(`${environment.apiUrl}User/forgot-password`,
    { "email": email } ,
    { //observe: 'response',
    //headers: 'HttpHeaders',
    // observe: "response", // to display the full response
    responseType: "json" }
    )
  }

  resetPassword(reset_token: string, new_password: string) {
    return this.httpClient
    .patch(`${environment.apiUrl}User/reset-password`,
    { 
      "resetPasswordToken": reset_token,
      "newPassword": new_password 
    },
    {responseType: 'json'}
    )
  }

  getBoards(userId: number): Observable<Array<BoardModel>> { //User in URL
    return this.httpClient.get<Array<BoardModel>>(`${environment.apiUrl}BoardMember/${userId}/user-boards`);
  }

  getBoardMembers(boardId: number): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>(`${environment.apiUrl}BoardMember/boards/${boardId}/get-members`);
  }

  inviteBoardMember(boardId: number, email: string) {
    return this.httpClient.post(`${environment.apiUrl}BoardMember/boards/${boardId}/add-board-member-by-email/${email}`, {});
  }

  acceptBoardInvitation(invitationToken: string) : Observable<ServiceResponse<BoardMemberModel>>  {
    return this.httpClient
      .patch<ServiceResponse<BoardMemberModel>>(`${environment.apiUrl}BoardMember/accept-invitation`,
      { "token": invitationToken } ,
      )
  }
 

  deleteBoardMember(boardId:number, memberId: number) {
    return this.httpClient.delete(`${environment.apiUrl}BoardMember/boards/${boardId}/delete-member/${memberId}`,
    {responseType: 'text'});
  }

  getSuggestedSearchUsers(emailSearched: string): Observable<Array<string>>{
    return this.httpClient.get<Array<string>>(`${environment.apiUrl}BoardMember/get-suggested-search-users/${emailSearched}`);
  }
  
  
  leaveBoard(userId: number, boardId:number) {
    return this.httpClient.delete(`${environment.apiUrl}BoardMember/boards/${userId}/leave-board/${boardId}`,
    {responseType: 'text'});
  }

  
}



  // getUser(userId: number): Observable<UserModel> {
  //   return this.httpClient.get<UserModel>(`${environment.apiUrl}User/${userId}`);
  // }