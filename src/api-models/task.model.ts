import { BoardModel } from "./board.model";
import { UserModel } from "./user.model";

 export interface TaskModel {
     id: number;
     text: string;
     dueDate: Date;
     createdAt: Date;
     boardId: number;
     board: BoardModel;
     creatorId: number;
     performerId: number;
     performer: UserModel;
     isCompleted: boolean;
     isOverdue: boolean;
     changeRecurredChildren: boolean;
     isRecurring: boolean;
     parentTaskId: number;
    }

    export interface AddTaskToBoardModel {
        text: string;
        dueDate: Date,
    }

    export interface TaskGroup {
        groupKey: any,
        tasks: Array<TaskModel>
    }



  
