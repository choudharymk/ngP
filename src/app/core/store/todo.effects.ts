// src/app/core/store/todo.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { loadTodos, loadTodosSuccess } from './todo.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() => this.todoService.getTodos().pipe(map(todos => loadTodosSuccess({ todos }))))
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}