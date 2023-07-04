import { BoardModel } from "./board.model";
import { UserModel } from "./user.model";

 export interface TaskModel {
     id: number;
     text: string;
     dueDate: Date,
     createdAt: Date,
     boardId: number,
     board: BoardModel,
     creatorId: number,
     performerId: number,
     performer: UserModel,
     isCompleted: boolean,
    }

    export interface AddTaskToBoardModel {
        text: string;
        dueDate: Date,
    }


  
