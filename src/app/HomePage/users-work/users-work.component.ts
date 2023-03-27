import { Component } from '@angular/core';

@Component({
  selector: 'app-users-work',
  templateUrl: './users-work.component.html',
  styleUrls: ['./users-work.component.css']
})
export class UsersWorkComponent {
  tasks=[
    {id: 1, context: "Eat a donut", dueDate:"27.03.2023", board: "Leisure"},
    {id: 2, context: "6000 steps", dueDate:"27.03.2023", board: "Sports"},
    {id: 3, context: "Do HW", dueDate:"29.03.2023", board: "Work"},
    {id: 4, context: "Go to a cafe", dueDate:"30.03.2023", board: "Leisure"},
  ]
}
