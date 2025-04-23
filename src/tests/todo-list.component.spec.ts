
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from '../app/features/todo/components/todo-list/todo-list.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { todoReducer } from '../app/core/store/todo.reducer';
import { TodoEffects } from '../app/core/store/todo.effects';
import { provideHttpClient } from '@angular/common/http';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        provideStore({ todos: todoReducer }),
        provideEffects([TodoEffects]),
        provideHttpClient(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a todo', () => {
    component.newTodoControl.setValue('Test Todo');
    component.addTodo();
    component.todos$.subscribe(todos => expect(todos.some(t => t.title === 'Test Todo')).toBe(true));
  });
});