import { Injectable } from "@angular/core";
import { NewTask } from "./new-task/new-task-model";

@Injectable({
    providedIn: 'root'
})
export class TasksService{
   private tasks = [
        {
          id: 't1',
          userId: 'u1',
          title: 'Master Angular',
          summary:
            'Learn all the basic and advanced features of Angular & how to apply them.',
          dueDate: '2025-12-31',
        },
        {
          id: 't2',
          userId: 'u3',
          title: 'Build first prototype',
          summary: 'Build a first prototype of the online shop website',
          dueDate: '2024-05-31',
        },
        {
          id: 't3',
          userId: 'u3',
          title: 'Prepare issue template',
          summary:
            'Prepare and describe an issue template which will help with project management',
          dueDate: '2024-06-15',
        },
      ];

      getUserTasks(userId: string){
        return this.tasks.filter((task) => task.userId === userId)
      }

      getSelectedTask(id: string){
        return this.tasks.find((task) => task.id === id);
      }

      addTask(taskData: NewTask, userId: string){
        this.tasks.unshift({
            id: new Date().getTime().toString(),
            userId: userId,
            title: taskData.title,
            summary: taskData.summary,
            dueDate: taskData.date
          });
      }

      updateTask(taskData: NewTask, userId: string, id: string){
        const updatedTask = {
          id: id,
          userId: userId,
          title: taskData.title,
          summary: taskData.summary,
          dueDate: taskData.date
        }

        let index = this.tasks.findIndex((task) => task.id === id);
        this.tasks[index] = updatedTask;
      }

      removeTask(id: string){
        this.tasks = this.tasks.filter((task) => task.id !== id);
      }
}