import { Component, EventEmitter, Input, Output, inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  @Input({ required: true }) task!: Task;
  @Output() cancelEditTask = new EventEmitter<void>();

  private taskService = inject(TasksService);

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  ngOnChanges(){
    this.enteredTitle = this.task.title;
    this.enteredSummary = this.task.summary;
    this.enteredDate = this.task.dueDate;
  }

  onClickCancel() {
    this.cancelEditTask.emit();
  }

  onSubmit(){
    this.taskService.updateTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDate,

    }, this.task.userId, this.task.id);

    this.cancelEditTask.emit();
  }
}
