// src/app/features/todo/components/todo-list/todo-list.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../../../core/services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent, TodoFilterComponent],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  newTodo = '';
  todos = signal<Todo[]>([]);
  filter = signal<'all' | 'active' | 'completed'>('all');

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => this.todos.set(todos));
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo).subscribe(todo => {
        this.todos.update(todos => [...todos, todo]);
        this.newTodo = '';
      });
    }
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(updated => {
      this.todos.update(todos => todos.map(t => (t.id === updated.id ? updated : t)));
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos.update(todos => todos.filter(t => t.id !== id));
    });
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter.set(filter);
    // Add filtering logic later
  }
}