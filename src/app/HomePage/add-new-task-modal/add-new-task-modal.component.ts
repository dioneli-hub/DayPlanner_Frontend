import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { BoardModel } from 'src/api-models/board.model';
import { Router } from '@angular/router';
import { BoardsService } from 'src/services/boards.service';
import { UsersService } from 'src/services/users.service';
import { TaskModel } from 'src/api-models/task.model';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { TasksService } from 'src/services/tasks.service';

@Component({
  selector: 'app-add-new-task-modal',
  templateUrl: './add-new-task-modal.component.html',
  standalone: true,
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, CommonModule],
  styleUrls: ['./add-new-task-modal.component.css']
})

export class AddNewTaskModalComponent implements OnInit {

  @Output()
  taskCreate = new EventEmitter<TaskModel>();

  @Input() boards: BoardModel[];

  taskText = null;
  taskDueDate = null;
  board = null;
  minDate = undefined;
  isSetPerformerChecked: boolean = false;

  constructor(private router: Router, 
    private boardsService: BoardsService,
    private tasksService: TasksService,
    private usersService: UsersService,
    private config: NgbDatepickerConfig) { 

      
    //datepicker
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }


  submit(value) {
    if (this.isSetPerformerChecked){this.usersService.current()
      .subscribe(user => {
        this.boardsService.addTaskToBoard(value, user.id)
            .subscribe(task=>{
              this.taskCreate.emit(task);
        })})} 
    else {
      this.boardsService.addTaskToBoard(value)
            .subscribe(task=>{
              this.taskCreate.emit(task);
    })}}
    

  ngOnInit(): void {
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
