// src/app/core/store/todo.actions.ts
import { createAction, props } from '@ngrx/store';
import { Todo } from '../services/todo.service';

export const addTodo = createAction('[Todo] Add', props<{ title: string }>());
export const updateTodo = createAction('[Todo] Update', props<{ todo: Todo }>());
export const deleteTodo = createAction('[Todo] Delete', props<{ id: number }>());
export const loadTodos = createAction('[Todo] Load');
export const loadTodosSuccess = createAction('[Todo] Load Success', props<{ todos: Todo[] }>());
export const setFilter = createAction('[Todo] Set Filter', props<{ filter: 'all' | 'active' | 'completed' }>());