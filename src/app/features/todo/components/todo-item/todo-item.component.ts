// src/app/features/todo/components/todo-item/todo-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../../core/services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styles: [`
    .completed { text-decoration: line-through; }
    [contentEditable] { outline: none; }
  `],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();
  editing = false;

  toggleComplete() {
    this.update.emit({ ...this.todo, completed: !this.todo.completed });
  }

  startEditing() {
    this.editing = true;
  }

  updateTitle(event: Event) {
    const title = (event.target as HTMLElement).textContent?.trim() || this.todo.title;
    this.update.emit({ ...this.todo, title });
    this.editing = false;
  }
}