import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new-board-modal',
  templateUrl: './add-new-board-modal.component.html',
  styleUrls: ['./add-new-board-modal.component.css']
})
export class AddNewBoardModalComponent {

  constructor(private http: HttpClient){

  }

  onBoardCreate(boardName: string){
    console.log(boardName)

    this.http.post(`${environment.apiUrl}Board`, {
        name: boardName,
    }).subscribe((response)=>{
      console.log(response)
    })
  }
}
