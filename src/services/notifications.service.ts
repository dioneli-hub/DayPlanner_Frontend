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
import { CreateNotificationModel, NotificationModel } from "src/api-models/notification.model";

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private httpClient: HttpClient,
              private userProvider: UserProvider) {
  }

  // createNotification(message: string) {
  //   return this.httpClient.post<CreateNotificationModel>(`${environment.apiUrl}User/`, 
  //     {
  //       text: message
  //     });
  // }

  getUserNotifications(): Observable<Array<NotificationModel>> {
    return this.httpClient.get<Array<NotificationModel>>(`${environment.apiUrl}Notification`);
  }

  deleteNotification(notificationId: number): Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiUrl}Notification/${notificationId}`);
  }




//   getBoards(userId: number): Observable<Array<BoardModel>> { //User in URL
//     return this.httpClient.get<Array<BoardModel>>(`${environment.apiUrl}BoardMember/${userId}/user-boards`);
//   }

}