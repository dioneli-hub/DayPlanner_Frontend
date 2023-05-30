import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { BoardModel } from 'src/api-models/board.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BoardsService } from 'src/services/boards.service';
import { UsersService } from 'src/services/users.service';
import { UserProvider } from 'src/providers/user.provider';

@Component({
  selector: 'app-add-new-task-modal',
  templateUrl: './add-new-task-modal.component.html',
  standalone: true,
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, CommonModule],
  styleUrls: ['./add-new-task-modal.component.css']
})

export class AddNewTaskModalComponent implements OnInit {
  @Input() boards: BoardModel[];
  //boards: Array<BoardModel>;

  taskText = null;
  taskDueDate = null;
  board = null;

  constructor(private router: Router, 
    private boardsService: BoardsService,
    private usersService: UsersService,
    private userProvider: UserProvider) { }
  submit(value) {
  this.boardsService.addTaskToBoard(value).subscribe(x=>{
  //this.router.navigate(['/']);
  });
  }
  ngOnInit(): void {
  //this.usersService.getBoards(this.userProvider.currentUser.id).subscribe(x=>this.boards = x);
  }
 }

// export class AddNewTaskModalComponent {
//   @Input() 

//   @Input() model: NgbDateStruct;
  

//   constructor(private http: HttpClient){

//   }

//   // @Output() outEnterTaskContent = new EventEmitter<string[]>()

//   onTaskCreate(taskText: string, taskBoardId, model: NgbDateStruct){
//     console.log(taskText)
//     console.log(taskBoardId)
//     console.log(model)

//     const jsDate = new Date(model.year, model.month - 1, model.day + 1);

//     this.http.post(`${environment.apiUrl}Board/${taskBoardId}/tasks`, {
//         text: taskText,
//         dueDate: jsDate
//     }).subscribe((response)=>{
//       console.log(response)
//     })
//   }
  
  // enterTaskContent(taskContentInput: HTMLInputElement, taskBoardInput: HTMLSelectElement, taskDueDate: NgbDateStruct){
  //   console.log('taskContentInput.value: ', taskContentInput.value)
  //   console.log('taskBoardInput.value: ', taskBoardInput.value)
  //   console.log('taskDueDate: ', taskDueDate)

  //   let dueDateString = '' + taskDueDate.day + '/' + taskDueDate.month + '/' + taskDueDate.year
  //   let taskObj = [taskContentInput.value, taskBoardInput.value, dueDateString]

  //   if (taskContentInput.value!='') {
  //     this.outEnterTaskContent.emit(taskObj)
  //   }
  //   taskContentInput.value=''
  // }


  // taskDueDate: string = ''
  // setTaskDueDate(taskDueDate: string){
  //   taskDueDate = taskDueDate
  // }}
