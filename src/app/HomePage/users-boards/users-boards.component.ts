import { Component } from '@angular/core';

@Component({
  selector: 'app-users-boards',
  templateUrl: './users-boards.component.html',
  styleUrls: ['./users-boards.component.css']
})
export class UsersBoardsComponent {
  boards=[
    {id:1, name: "Leisure"},
    {id:2, name: "Work"},
    {id:3, name: "Sports"},
  ]
}
