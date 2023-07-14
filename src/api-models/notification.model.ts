import { UserModel } from "./user.model"

export interface NotificationModel {
    id: number
    text: string
    createdAt: Date
    UserId: number
    User: UserModel
}



export interface CreateNotificationModel {
     text: string;
}
