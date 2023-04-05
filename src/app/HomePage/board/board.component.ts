import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { BoardModel } from 'src/app/api-models/board.model';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() board: BoardModel;

  constructor(private http: HttpClient){

  }
  
  onDeleteBoard(boardId: number){
    this.http.delete(`${environment.apiUrl}Board/${boardId}`)
    .subscribe();
  }
}
