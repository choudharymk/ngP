// src/app/core/store/todo.selectors.ts
import { createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

export interface AppState {
  todos: TodoState;
}

export const selectTodoState = (state: AppState) => state.todos;

export const selectTodos = createSelector(
  selectTodoState,
  (state: TodoState) => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(t => !t.completed);
      case 'completed':
        return state.todos.filter(t => t.completed);
      default:
        return state.todos;
    }
  }
);

export const selectFilter = createSelector(
  selectTodoState,
  (state: TodoState) => state.filter
);