import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Todo } from '../models/Todo';

/**
 * Injectable TodoService
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * Creates an instance of todo service.
   * @param apiService
   * @param config
   */
  constructor(private httpClient: HttpClient, private config: ConfigService) {}

  /**
   * Adds todo
   * @param todo
   * @returns
   */
  addTodo(todo: any): Observable<any> {
    return this.httpClient.post(this.config.todo_url, todo);
  }

  /**
   * Updates todo
   * @param todoId
   * @param todoData
   * @returns
   */
  updateTodo(todoId: number, todoData: any): Observable<any> {
    return this.httpClient.put(`${this.config.todo_url}/${todoId}`, todoData);
  }

  /**
   * Gets all todos
   * @returns
   */
  getAllTodos(): Observable<any> {
    return this.httpClient.get(this.config.todo_url);
  }

  /**
   * Removes todo
   * @param todoId
   * @returns
   */
  removeTodo(todoId: number): Observable<any> {
    return this.httpClient.delete(`${this.config.todo_url}/${todoId}`);
  }
}
