import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../api-models/user.model";
import {Observable, of} from "rxjs";
import {UserProvider} from "../providers/user.provider";
import {environment} from "../environments/environment";

import { NotificationModel } from "src/api-models/notification.model";

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private httpClient: HttpClient,
              private userProvider: UserProvider) {
  }

  getUserNotifications(): Observable<Array<NotificationModel>> {
    return this.httpClient.get<Array<NotificationModel>>(`${environment.apiUrl}Notification`);
  }

  deleteNotification(notificationId: number): Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiUrl}Notification/${notificationId}`);
  }

  deleteUserNotifications(): Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiUrl}Notification`);
  }



//   getBoards(userId: number): Observable<Array<BoardModel>> { //User in URL
//     return this.httpClient.get<Array<BoardModel>>(`${environment.apiUrl}BoardMember/${userId}/user-boards`);
//   }


  // createNotification(message: string) {
  //   return this.httpClient.post<CreateNotificationModel>(`${environment.apiUrl}User/`, 
  //     {
  //       text: message
  //     });
  // }
}