import { Component } from '@angular/core';

@Component({
  selector: 'app-users-boards',
  templateUrl: './users-boards.component.html',
  styleUrls: ['./users-boards.component.css']
})

export class UsersBoardsComponent {
  boards=[
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
