// src/app/features/todo/components/todo-filter/todo-filter.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-filter-component.html',
})
export class TodoFilterComponent {
  @Output() filter = new EventEmitter<'all' | 'active' | 'completed'>();
}