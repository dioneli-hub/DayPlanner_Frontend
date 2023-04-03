import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Board, Task } from 'src/app/models';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent {

  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.fetchTasks();
  }



  addTask(taskObj: string[]){
    let [context, board, dueDateString] = taskObj
    console.log('dueDateString: ', dueDateString)
    this.tasks.push({
      id: this.tasks.length+1,
      context: context,
      dueDate: dueDateString,
      board: board

    })
  }

  private fetchTasks(){
    this.http.get(`${environment.apiUrl}TaskItem`)
    .subscribe((response)=>
    console.log(response))
  }

  onTasksFetch(){
    this.fetchTasks();
  }
  
  tasks: Task[]=[
    {id: 1, context: "Eat a donut", dueDate:"27/03/2023", board: "Leisure"},
    {id: 2, context: "6000 steps", dueDate:"27/03/2023", board: "Sports"},
    {id: 3, context: "Do HW", dueDate:"29/03/2023", board: "Work"},
    {id: 4, context: "Go to a cafe", dueDate:"30/03/2023", board: "Leisure"},
  ];

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
