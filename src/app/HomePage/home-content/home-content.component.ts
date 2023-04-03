import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
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

  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.fetchTasks();
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
    this.http.get<{[key: number]: Task}>(`${environment.apiUrl}TaskItem`)
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
  
  // tasks: Task[]=[
  //   {id: 1, context: "Eat a donut", dueDate:"27/03/2023", board: "Leisure"},
  //   {id: 2, context: "6000 steps", dueDate:"27/03/2023", board: "Sports"},
  //   {id: 3, context: "Do HW", dueDate:"29/03/2023", board: "Work"},
  //   {id: 4, context: "Go to a cafe", dueDate:"30/03/2023", board: "Leisure"},
  // ];

  boards: Board[] = [
    {id:1, name: "Leisure", tasks: [
      {id: 1, context: "Eat a donut", dueDate:"27/03/2023", board: "Leisure"},
      {id: 4, context: "Go to a cafe", dueDate:"30/03/2023", board: "Leisure"},
    ]},

    {id:2, name: "Work", tasks: [
      {id: 3, context: "Do HW", dueDate:"29/03/2023", board: "Work"},
    ]},

    {id:3, name: "Sports", tasks: [
      {id: 2, context: "6000 steps", dueDate:"27/03/2023", board: "Sports"}
    ],},
  ]

}
