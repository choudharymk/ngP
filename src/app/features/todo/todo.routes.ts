// src/app/features/todo/todo.routes.ts
import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const todoRoutes: Routes = [
  { path: '', component: TodoListComponent },
];