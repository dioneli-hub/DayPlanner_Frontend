import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { BoardModel } from 'src/api-models/board.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new-task-modal',
  templateUrl: './add-new-task-modal.component.html',
  standalone: true,
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, CommonModule],
  styleUrls: ['./add-new-task-modal.component.css']
})
export class AddNewTaskModalComponent {
  @Input() boards: BoardModel[];

  @Input() model: NgbDateStruct;
  

  constructor(private http: HttpClient){

  }

  // @Output() outEnterTaskContent = new EventEmitter<string[]>()

  onTaskCreate(taskText: string, taskBoardId, model: NgbDateStruct){
    console.log(taskText)
    console.log(taskBoardId)
    console.log(model)

    const jsDate = new Date(model.year, model.month - 1, model.day + 1);

    this.http.post(`${environment.apiUrl}Board/${taskBoardId}/tasks`, {
        text: taskText,
        dueDate: jsDate
    }).subscribe((response)=>{
      console.log(response)
    })
  }
  
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
  // }
}
