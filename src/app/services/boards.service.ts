import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { BoardDto, BoardModel } from "../api-models/board.model";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class BoardsService {
    constructor(private httpClient: HttpClient) {
    }

    
  
    // create(firstName: string, lastName: string, email: string, password: string) {
    //   return this.httpClient.post<SimpleUserModel>(`${environment.apiUrl}users/`, {
    //     firstName,
    //     lastName,
    //     email,
    //     password
    //   });
    // }
}