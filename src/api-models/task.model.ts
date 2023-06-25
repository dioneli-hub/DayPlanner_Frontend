import { BoardModel } from "./board.model";

 export interface TaskModel {
     id: number;
     text: string;
     dueDate: Date,
     createdAt: Date,
     boardId: number,
     board: BoardModel,
     creatorId: number,
     performerId: number,
     isCompleted: boolean,
    }

    export interface AddTaskToBoardModel {
        text: string;
        dueDate: Date,
    }


  
