import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTask } from './new-task/new-task-model';
import { TasksService } from './tasks.service';
import { Task } from './task/task.model';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent, EditTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;



  isAddingTask = false;
  isEditingTask = false;

  selectedTask = {
    id: 'string',
    userId: 'string',
    title: 'string',
    summary: 'string',
    dueDate: 'string'
  };

  constructor(private tasksService: TasksService) {

  }

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  getSelectedTask(id: string) {
    return this.tasksService.getSelectedTask(id);
  }

  onDeleteTask(id: string) {
    this.tasksService.removeTask(id);
  }

  onEditTask() {

  }

  onCancelAddingTask() {
    this.isAddingTask = false;
  }

  onCancelEdititngTask() {
    this.isEditingTask = false;
  }

  onStartEdititngTask(task: Task) {
    this.isEditingTask = true;

    this.selectedTask = task;
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onAddTask(taskData: NewTask) {

    this.tasksService.addTask(taskData, this.userId);
    this.isAddingTask = false;
  }
}
