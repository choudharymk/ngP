// src/app/core/store/todo.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../services/todo.service';
import { addTodo, updateTodo, deleteTodo, loadTodosSuccess, setFilter } from './todo.actions';

export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

export const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { title }) => ({
    ...state,
    todos: [...state.todos, { id: Date.now(), title, completed: false }],
  })),
  on(updateTodo, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => (t.id === todo.id ? todo : t)),
  })),
  on(deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(t => t.id !== id),
  })),
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
  })),
  on(setFilter, (state, { filter }) => ({
    ...state,
    filter,
  }))
);