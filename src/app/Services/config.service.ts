import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Injectable ConfigService
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /**
   * Todo api url of config service
   */
  private _todo_api_url = `${environment.url}:${environment.port}/todoapi/v1`;

  //
  // ─── TODO-ENDPOINT ───────────────────────────────────────────────────────────────────
  //
  /**
   * Todo url of config service
   */
  private _todo_url = `${this._todo_api_url}/todos`;

  /**
   * Gets todo url
   */
  get todo_url(): string {
    return this._todo_url;
  }
}
