import { Component } from '@angular/core';

@Component({
  selector: 'app-todays-tasks',
  templateUrl: './todays-tasks.component.html',
  styleUrls: ['./todays-tasks.component.css']
})
export class TodaysTasksComponent {
  tasks=[
    {id: 1, context: "Eat a donut", dueDate:"27.03.2023", board: "Leisure"},
    {id: 2, context: "6000 steps", dueDate:"27.03.2023", board: "Sports"},
    {id: 3, context: "Do HW", dueDate:"29.03.2023", board: "Work"},
    {id: 4, context: "Go to a cafe", dueDate:"30.03.2023", board: "Leisure"},
  ]
}
