import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../../models';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-new-task-modal',
  templateUrl: './add-new-task-modal.component.html',
  standalone: true,
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, CommonModule],
  styleUrls: ['./add-new-task-modal.component.css']
})
export class AddNewTaskModalComponent {
  @Input() boards: Board[];
  @Input() model: NgbDateStruct;

  @Output() outEnterTaskContent = new EventEmitter<string[]>()
  

  /*@Output() outEnterTaskDueDate = new EventEmitter<string>()

  enterTaskDueDate(taskDueDateInput: HTMLInputElement){
    console.log('taskDueDateInput.value: ', taskDueDateInput.value)
      let [year, month, day] = taskDueDateInput.value
      let dateString = '' + day + '/' + month + '/' + year
      this.outEnterTaskDueDate.emit(dateString)

      console.log('dateString: ', dateString)
  } */
  enterTaskContent(taskContentInput: HTMLInputElement, taskBoardInput: HTMLSelectElement, taskDueDate: NgbDateStruct){
    console.log('taskContentInput.value: ', taskContentInput.value)
    console.log('taskBoardInput.value: ', taskBoardInput.value)
    console.log('taskDueDate: ', taskDueDate)

    let dueDateString = '' + taskDueDate.day + '/' + taskDueDate.month + '/' + taskDueDate.year
    let taskObj = [taskContentInput.value, taskBoardInput.value, dueDateString]

    if (taskContentInput.value!='') {
      this.outEnterTaskContent.emit(taskObj)
    }
    taskContentInput.value=''
  }


  taskDueDate: string = ''
  setTaskDueDate(taskDueDate: string){
    taskDueDate = taskDueDate
  }
}
