import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { BoardModel } from 'src/app/api-models/board.model';
import { TaskModel } from 'src/app/api-models/task.model';
import { environment } from 'src/app/environments/environment';
import { Board, Task } from 'src/app/models';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent {

  tasks: TaskModel[] = []
  todaysTasks: TaskModel[] = []
  boards: BoardModel[] = []


  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.fetchTasks();
    this.fetchBoards();
    this.fetchTodaysTasks();
  }



  // addTask(taskObj: string[]){
  //   let [context, board, dueDateString] = taskObj
  //   console.log('dueDateString: ', dueDateString)
  //   this.tasks.push({
  //     id: this.tasks.length+1,
  //     context: context,
  //     dueDate: dueDateString,
  //     board: board

  //   })
  // }

  private fetchTasks(){
    this.http.get<{[key: number]: TaskModel}>(`${environment.apiUrl}TaskItem`)
    .pipe(map((response)=>{
      const tasks = [];
      for(const key in response){
        if(response.hasOwnProperty(key)){
          tasks.push({...response[key]}) //, id: key
        }
          
      }
      return tasks;
    }))
    .subscribe((tasks)=>{
    console.log(tasks);
    this.tasks = tasks;
  });
    
  }

  onTasksFetch(){
    this.fetchTasks();
  }

  private fetchBoards(){
    this.http.get<{[key: number]: BoardModel}>(`${environment.apiUrl}Board`)
    .pipe(map((response)=>{
      const boards = [];
      for(const key in response){
        if(response.hasOwnProperty(key)){
          boards.push({...response[key]}) //, id: key
        }
          
      }
      return boards;
    }))
    .subscribe((boards)=>{
    console.log(boards);
    this.boards = boards;
  });
    
  }

  onTodaysTasksFetch(){
    this.fetchTodaysTasks();
  }

  private fetchTodaysTasks(){
    this.http.get<{[key: number]: TaskModel}>(`${environment.apiUrl}TaskItem/todaystasks`)
    .pipe(map((response)=>{
      const todaysTasks = [];
      for(const key in response){
        if(response.hasOwnProperty(key)){
          todaysTasks.push({...response[key]}) //, id: key
        }
          
      }
      return todaysTasks;
    }))
    .subscribe((todaysTasks)=>{
    console.log(todaysTasks);
    this.todaysTasks = todaysTasks;
  });
    
  }

  onBoardsFetch(){
    this.fetchBoards();
  }
  
  // tasks: Task[]=[
  //   {id: 1, context: "Eat a donut", dueDate:"27/03/2023", board: "Leisure"},
  //   {id: 2, context: "6000 steps", dueDate:"27/03/2023", board: "Sports"},
  //   {id: 3, context: "Do HW", dueDate:"29/03/2023", board: "Work"},
  //   {id: 4, context: "Go to a cafe", dueDate:"30/03/2023", board: "Leisure"},
  // ];

  // boards: Board[] = [
  //   {id:1, name: "Leisure", tasks: [
  //     {id: 1, context: "Eat a donut", dueDate:"27/03/2023", board: "Leisure"},
  //     {id: 4, context: "Go to a cafe", dueDate:"30/03/2023", board: "Leisure"},
  //   ]},

  //   {id:2, name: "Work", tasks: [
  //     {id: 3, context: "Do HW", dueDate:"29/03/2023", board: "Work"},
  //   ]},

  //   {id:3, name: "Sports", tasks: [
  //     {id: 2, context: "6000 steps", dueDate:"27/03/2023", board: "Sports"}
  //   ],},
  // ]

}
