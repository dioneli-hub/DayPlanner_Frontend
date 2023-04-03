import { TaskModel } from "./task.model";

 export interface BoardModel {
     id: number;
     name: string;
     tasks: Array<TaskModel>;
    }
  
    export interface BoardDto {
        id: number;
        name: string;
    }
