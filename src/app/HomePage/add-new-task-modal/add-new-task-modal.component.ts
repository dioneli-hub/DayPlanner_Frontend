import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../../models';

@Component({
  selector: 'app-add-new-task-modal',
  templateUrl: './add-new-task-modal.component.html',
  styleUrls: ['./add-new-task-modal.component.css']
})
export class AddNewTaskModalComponent {
  @Input() boards: Board[];

  @Output() outEnterTaskContent = new EventEmitter<string>()
  @Output() outEnterTaskBoard = new EventEmitter<string>()
  @Output() outEnterTaskDueDate = new EventEmitter<string>()

  enterTaskContent(taskContentInput: HTMLInputElement){
    console.log('taskContentInput.value: ', taskContentInput.value)
    this.outEnterTaskContent.emit(taskContentInput.value)

    taskContentInput.value=''
  }

  enterTaskBoard(taskBoardInput: string){}

  enterTaskDueDate(taskDueDateInput: HTMLInputElement){
    console.log('taskContentInput.value: ', taskDueDateInput.value)
    this.outEnterTaskDueDate.emit(taskDueDateInput.value)
  }
}
