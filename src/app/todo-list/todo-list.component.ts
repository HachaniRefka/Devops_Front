import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../models/Todo';
import { TodoService } from '../Services/todo.service';

/**
 * Component TodoListComponent
 */
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Array<Todo>;
  todoForm: FormGroup;

  newTodo: Todo = new Todo();
  editing = false;
  editingTodo: Todo = new Todo();
  submitted = false;
  updatedTodo: any;
  /**
   * Creates an instance of todo list component.
   * @param todoService
   * @param formBuilder
   */
  constructor(private todoService: TodoService, private formBuilder: FormBuilder) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.initializeTodoForm();
    this.getTodos();
  }

  /**
   * Initializes todo form using reactive forms
   */
  initializeTodoForm() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      completed: ['']
    });
  }

  /**
   * Gets todo forms control
   */
  get todoFormsControls() {
    return this.todoForm.controls;
  }

  getTodos(): void {
    this.todoService
      .getAllTodos()
      .subscribe(todos => (this.todos = todos), err => console.error('error fetching todos'));
  }

  /**
   * Determines whether submit on
   * @returns
   */
  onSubmit() {
    console.log('SF-LOG: onSubmit -> todoForm', this.todoForm.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.todoForm.invalid) {
      return;
    } else {
      //
      // ─── CALL CREATION SERVICE ────────────────────────────────────────────────
      //
      this.createTodo(this.todoForm);
    }
  }

  /**
   * Creates todo
   * @param todoForm
   */
  createTodo(todoForm): void {
    this.todoService.addTodo(todoForm.value).subscribe(createdTodo => {
      console.log('SF-LOG: constructor -> createdTodo', createdTodo);
      todoForm.reset();
      this.newTodo = new Todo();
      this.todos.unshift(createdTodo);
    });
  }

  /**
   * Deletes todo
   * @param id
   */
  deleteTodo(id: number): void {
    this.todoService.removeTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }

  /**
   * Updates todo
   * @param todoData
   */
  updateTodo(todoData: Todo): void {
    console.log(todoData);
    this.todoService.updateTodo(todoData.id, todoData).subscribe(updatedTodo => {
      this.updatedTodo = updatedTodo;
      const existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
      Object.assign(existingTodo, updatedTodo);
      this.clearEditing();
    });
  }

  /**
   * Toggles completed
   * @param todoData
   */
  toggleCompleted(todoData: Todo): void {
    todoData.completed = !todoData.completed;
    this.todoService.updateTodo(todoData.id, todoData).subscribe(updatedTodo => {
      const existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
      Object.assign(existingTodo, updatedTodo);
    });
  }

  /**
   * Edits todo
   * @param todoData
   */
  editTodo(todoData: Todo): void {
    this.editing = true;
    Object.assign(this.editingTodo, todoData);
  }

  /**
   * Clears editing
   */
  clearEditing(): void {
    this.editingTodo = new Todo();
    this.editing = false;
  }
}
