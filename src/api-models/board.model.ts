import { TaskModel } from "./task.model";

export interface BoardModel {
    id: number
    name: string
    createdAt: Date
    creatorId: number
}



export interface CreateBoardModel {
     name: string;
}
