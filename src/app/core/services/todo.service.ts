
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private localTodos: Todo[] = [];

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      map(todos => todos.slice(0, 5)),
      delay(1000) // Simulate latency
    );
  }

  addTodo(title: string): Observable<Todo> {
    const todo: Todo = { id: Date.now(), title, completed: false };
    this.localTodos.push(todo);
    return of(todo).pipe(delay(500));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    this.localTodos = this.localTodos.map(t => (t.id === todo.id ? todo : t));
    return of(todo).pipe(delay(500));
  }

  deleteTodo(id: number): Observable<void> {
    this.localTodos = this.localTodos.filter(t => t.id !== id);
    return of(void 0).pipe(delay(500));
  }
}